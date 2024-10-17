import type { EventHandlerRequest, H3Event } from 'h3';
// 删除cookie
export function clearRefreshTokenCookie(event: H3Event<EventHandlerRequest>) {
    deleteCookie(event, 'jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
}

// 设置token 到 cookie 响应头里
export function setRefreshTokenCookie(
    event: H3Event<EventHandlerRequest>,
    refreshToken: string,
) {
    setCookie(event, 'jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    });
}
// 从cookie 拿到token
export function getRefreshTokenFromCookie(event: H3Event<EventHandlerRequest>) {
    const refreshToken = getCookie(event, 'jwt');
    return refreshToken;
}