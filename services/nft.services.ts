import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleMyMintedNfts = async (params?: any) => {
  // walletAddress=${params?.wallet}&
  return await HTTP_CLIENT.get(
    `/minted-nft/listAll/me?page=${params?.page}&limit=${params?.limit}`
  );
};
const handleMarketplaceListing = async (
  id: any,
  counter?: number,
  listingPricevalue?: any
) => {
  return await HTTP_CLIENT.put(
    `/minted-nft/${id}/toggle-market-activeplace/${counter}/${listingPricevalue}`
  );
};
const AcceptListingBid = async (mintedNftId: string, bidId: string) => {
  return await HTTP_CLIENT.post(
    `/minted-nft/${mintedNftId}/bidding/${bidId}/accept`
  );
};
const GetListingBid = async (mintedNftId: string) => {
  return await HTTP_CLIENT.get(`/mintednft-bidding/${mintedNftId}`);
};

const HandleBurnNfts = async (nftId: string) => {
  return await HTTP_CLIENT.get(`/minted-nft/burn/${nftId}`);
};

const NftOwnershipTransfer = async (params: any) => {
  return await HTTP_CLIENT.post(`/nft/nft-ownership-transfer`, params);
};

const NftOwnershipTransferInstant = async (params: any) => {
  return await HTTP_CLIENT.post(`/nft/nft-ownership-transfer-instant`, params);
};

const HandleNftisMinted = async (id: any) => {
  return await HTTP_CLIENT.get(`/minted-nft/is-minted/${id}`);
};
const MintedNftValue = async (address: any) => {
  return await HTTP_CLIENT.get(`/nft/${address}/get-all-minted-nfts-value`);
};

export {
  handleMyMintedNfts,
  handleMarketplaceListing,
  AcceptListingBid,
  GetListingBid,
  HandleBurnNfts,
  NftOwnershipTransfer,
  HandleNftisMinted,
  NftOwnershipTransferInstant,
  MintedNftValue,
};
