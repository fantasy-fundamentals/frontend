import { HTTP_CLIENT } from "../utilty/axiosClient";

const changesImageUrl = async (params: any) => {
  return await HTTP_CLIENT.post(`/storage/upload`, params);
};

export { changesImageUrl };
