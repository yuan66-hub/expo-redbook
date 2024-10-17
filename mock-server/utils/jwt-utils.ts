import type { EventHandlerRequest, H3Event } from 'h3';

import jwt from 'jsonwebtoken';

import { UserInfo, MOCK_USERS } from './mock-data';

// TODO: Replace with your own secret key
const ACCESS_TOKEN_SECRET = 'access_token_secret';
const REFRESH_TOKEN_SECRET = 'refresh_token_secret';

export interface UserPayload extends UserInfo {
    iat: number;
    exp: number;
}
// 生成jwt
export function generateAccessToken(user: UserInfo) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}
// 生成jwd
export function generateRefreshToken(user: UserInfo) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    });
}
// 验证token
export function verifyAccessToken(
    event: H3Event<EventHandlerRequest>,
): null | Omit<UserInfo, 'pwd'> {
    const authHeader = getHeader(event, 'Authorization');
    if (!authHeader?.startsWith('Bearer')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload;

        const username = decoded.name;
        const user = MOCK_USERS.find((item) => item.name === username);
        const { pwd: _pwd, ...userinfo } = user;
        return userinfo;
    } catch {
        return null;
    }
}
// 验证刷新token
export function verifyRefreshToken(
    token: string,
): null | Omit<UserInfo, 'pwd'> {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload;
        const username = decoded.name;
        const user = MOCK_USERS.find((item) => item.name === username);
        const { pwd: _pwd, ...userinfo } = user;
        return userinfo;
    } catch {
        return null;
    }
}