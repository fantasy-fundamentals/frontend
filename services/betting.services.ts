import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleBettingData = async () => {
  return await HTTP_CLIENT.get(`/admin-import/get-odds`);
};

export { handleBettingData };
