import AsyncStorage from "@react-native-async-storage/async-storage"
import { HOST } from "./const";


const stringify = (params: any) => {
    const strs: any[] = []
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const val = params[key];
            strs.push(`${key}=${val}`)

        }
    }
    return strs.join('&')
}

export interface IRequestBody {
    url: string
    method?: string
    params?: any
    headers?: any
}
const isServer = false
const SUCCESS_CODE = 200



class Request {
    /**
     * 请求拦截器
     */
    async interceptorsRequest({ url, method, params, headers = {} }: IRequestBody) {
        let queryParams = ''; //url参数
        let requestPayload = ''; //请求体数据
        const config = {}
        const userInfo: string = await AsyncStorage.getItem('userinfo') as string
        const { accessToken } = JSON.parse(userInfo) || {}
        if (accessToken) {
            headers = Object.assign(headers, { 'Authorization': `Bearer ${accessToken}` });
        }
        if (method === 'GET' || method === 'DELETE') {
            //fetch对GET请求等，不支持将参数传在body上，只能拼接url
            if (params) {
                queryParams = stringify(params);
                url = `${url}?${queryParams}`;
            }
        } else {

            //非form-data传输JSON数据格式
            if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(params))) {
                headers = Object.assign(headers, { 'Content-Type': 'application/json', 'Accept': 'application/json', });
                requestPayload = JSON.stringify({
                    ...params,
                });
            }
        }
        return {
            url,
            options: {
                method,
                headers,
                body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
                ...config,
            },
        };
    }

    /**
     * 响应拦截器
     */
    interceptorsResponse(res: any) {
        return new Promise(async (resolve, reject) => {
            const myData = await res.json()
            const { status } = res
            if (status === 403) {
                return reject(myData)
            }
            const { code = '', data = {}, message } = myData
            if (res.ok && code === SUCCESS_CODE && isServer) {
                return resolve(data);
            } else if (res.ok && code === SUCCESS_CODE && !isServer) {
                return resolve(data)
            } else if ((!res.ok || code !== SUCCESS_CODE) && isServer) {
                throw new Error(message || '服务器错误!')
            } else if (res.ok && code !== SUCCESS_CODE && !isServer) {
                return reject(myData)
            }
        });
    }

    async httpFactory({ url = '', params = {}, method }: IRequestBody) {
        // https://github.com/expo/expo/issues/16451
        const host = HOST
        const req = await this.interceptorsRequest({
            url: host + '/' + url,
            method,
            params: params.data,
            headers: params.headers || {}
        });

        const res = await fetch(req.url, req.options);
        return this.interceptorsResponse(res);
    }

    request(method: string, url: string, params: any) {
        return this.httpFactory({ url, params, method });
    }

    get(url: string, params: any) {
        return this.request('GET', url, params);
    }

    post(url: string, params: any) {
        return this.request('POST', url, params);
    }

    put(url: string, params: any) {
        return this.request('PUT', url, params);
    }

    delete(url: string, params: any) {
        return this.request('DELETE', url, params);
    }

    patch(url: string, params: any) {
        return this.request('PATCH', url, params);
    }
}

const request = new Request();

export default request;