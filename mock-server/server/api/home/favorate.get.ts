import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~~/utils/jwt-utils';
import { unAuthorizedResponse, sleep, useResponseSuccess } from '~~/utils/response';
import { MOCK_ARTICLES } from '~~/utils/mock-data';

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event);
    if (!userinfo) {
        return unAuthorizedResponse(event);
    }

    await sleep(600);

    // 点赞列表
    return useResponseSuccess([MOCK_ARTICLES[3], MOCK_ARTICLES[10], MOCK_ARTICLES[11], MOCK_ARTICLES[12]])
});