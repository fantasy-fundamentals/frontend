import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleShopData = async (params?: any) => {
  return await HTTP_CLIENT.get(`/shop?limit=${13}&page=${params ? params : 0}`);
};
const handleMarketData = async (params?: any) => {
  let END_POINT_TO_HIT = `/nft?`;
  // Code that would allow only truthy values to be included in the query params
  let filterQueryStr = "";
  if (![undefined, null].includes(params)) {
    for (let [key, value] of Object.entries(params)) {
      if (Boolean(value)) {
        filterQueryStr += `&${key}=${value}`;
      }
    }
  }

  END_POINT_TO_HIT =
    filterQueryStr.length > 0
      ? `${END_POINT_TO_HIT}${filterQueryStr}`
      : END_POINT_TO_HIT;
  return await HTTP_CLIENT.get(END_POINT_TO_HIT);
};

const handleArticleData = async (params?: any) => {
  return await HTTP_CLIENT.get(
    `/project-article/?page=${params ? params : 0}&limit=${20}`
  );
};

const handleShopPaypalOrders = async (params?: any) => {
  return await HTTP_CLIENT.post(`/shop-orders/paypal`, params);
};

const handleShopWelletOrders = async (params?: any) => {
  return await HTTP_CLIENT.post(`/shop-orders/via/wallet`, params);
};

const handleShopDetails = async (productId?: any) => {
  return await HTTP_CLIENT.get(`/shop/${productId}`);
};

export {
  handleShopData,
  handleArticleData,
  handleMarketData,
  handleShopPaypalOrders,
  handleShopWelletOrders,
  handleShopDetails,
};
