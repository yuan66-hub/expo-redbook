import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~~/utils/jwt-utils';
import { unAuthorizedResponse, sleep, useResponseSuccess } from '~~/utils/response';

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event);
    if (!userinfo) {
        return unAuthorizedResponse(event);
    }

    await sleep(600);

    // 账户信息
    return useResponseSuccess({
        followCount: 28,
        fans: 648,
        favorateCount: 1988,
    })
});