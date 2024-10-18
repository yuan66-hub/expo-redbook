import {
    clearRefreshTokenCookie,
    setRefreshTokenCookie,
} from '~~/utils/cookie-utils';
import { generateAccessToken, generateRefreshToken } from '~~/utils/jwt-utils';
import { MOCK_USERS } from '~~/utils/mock-data';

import { forbiddenResponse, useResponseError, useResponseSuccess } from '~~/utils/response';
const host = process.env.HOST
export default defineEventHandler(async (event) => {
    const { password, username } = await readBody(event);

    if (!password || !username) {
        setResponseStatus(event, 400);
        return useResponseError(
            'BadRequestException',
            'Username and password are required',
        );
    }

    const findUser = MOCK_USERS.find(
        (item) => item.name === username && item.pwd === password,
    );

    if (!findUser) {
        clearRefreshTokenCookie(event);
        return forbiddenResponse(event);
    }

    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    setRefreshTokenCookie(event, refreshToken);

    return useResponseSuccess({
        ...findUser,
        accessToken,
    });
});