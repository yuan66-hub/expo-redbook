import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~~/utils/jwt-utils';
import { unAuthorizedResponse, sleep, usePageResponseSuccess } from '~~/utils/response';
import { MOCK_GOODS } from '~~/utils/mock-data';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const { page, pageSize } = getQuery(event);
  // 商品列表
  return usePageResponseSuccess(page as string, pageSize as string, MOCK_GOODS);
});