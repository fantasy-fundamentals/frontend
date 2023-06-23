import { HTTP_CLIENT } from "../utilty/axiosClient";

const generateSecForPayment = async (params?: any) => {
  return await HTTP_CLIENT.post(`/payment/stripe`, params);
};
const handlePaypalPayment = async (params?: any) => {
  return await HTTP_CLIENT.post(`/nft-orders/paypal`, params);
};
const createOrders = async (params?: any) => {
  return await HTTP_CLIENT.post(`/orders/create`, params);
};
const CreateWalletOrder = async (params?: any) => {
  return await HTTP_CLIENT.post(`/nft-orders/via/wallet`, params);
};
const getCurrencyRates = async (param?: any) => {
  return await HTTP_CLIENT.get(`/settings/rate/${param ? param : "cardano"}`);
};
const getMintedNfts = async (param?: any) => {
  return await HTTP_CLIENT.get(`/minted-nft/${param}/details`);
};
const handleMintedNfts = async (nftId?: any, params?: any) => {
  return await HTTP_CLIENT.post(`/minted-nft/${nftId}/bidding/new`, params);
};
const removeNftMarketListing = async (nftId?: any, walletAddress?: any) => {
  return await HTTP_CLIENT.get(`/nft/claim-back/${nftId}/${walletAddress}`);
};

export {
  generateSecForPayment,
  handlePaypalPayment,
  createOrders,
  CreateWalletOrder,
  getCurrencyRates,
  getMintedNfts,
  handleMintedNfts,
  removeNftMarketListing,
};
