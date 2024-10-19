/*
 * @Author: 'yuanjianming' '1743394015@qq.com'
 * @Date: 2024-10-19 18:37:51
 * @LastEditors: 'yuanjianming' '1743394015@qq.com'
 * @LastEditTime: 2024-10-19 19:03:51
 * @FilePath: \expo-redbook\mock-server\server\api\home\articleDetail.get.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { verifyAccessToken } from '~~/utils/jwt-utils';
import {
  unAuthorizedResponse,
  sleep,
  useResponseSuccess,
} from '~~/utils/response';
import { MOCK_ARTICLES } from '~~/utils/mock-data';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const { id } = getQuery(event);
  const article = MOCK_ARTICLES.find(item=>item.id === Number(id));

  
  // 分页
  return useResponseSuccess(article);
});
