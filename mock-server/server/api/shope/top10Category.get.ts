import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~~/utils/jwt-utils';
import { unAuthorizedResponse, sleep, useResponseSuccess } from '~~/utils/response';
import { MOCK_TOP10CATEGORY } from '~~/utils/mock-data';

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event);
    if (!userinfo) {
        return unAuthorizedResponse(event);
    }

    await sleep(600);

    // top10品类
    return useResponseSuccess(MOCK_TOP10CATEGORY)
});