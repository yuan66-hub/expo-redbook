import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~~/utils/jwt-utils';
import { unAuthorizedResponse, sleep, useResponseSuccess } from '~~/utils/response';

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event);
    if (!userinfo) {
        return unAuthorizedResponse(event);
    }

    await sleep(600);

    // 未读消息
    return useResponseSuccess({ unreadFavorate: 118, newFollow: 12, comment: 64 })
});