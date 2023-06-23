import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleUserLogin = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/login", params);
};
const handleForgotPassword = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/forgot-password", params);
};
const handlePinVerification = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/verify-pin", params);
};
const handleCreateNewPassword = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/create-new-password", params);
};
const handleChangePassword = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/change-password", params);
};
const handleUserRegister = async (params: any) => {
  return await HTTP_CLIENT.post("/auth/register", params);
};
const handleCloseBeta = async (params: any) => {
  return await HTTP_CLIENT.post("/close-beta", params);
};
const handleUserReports = async (params: any) => {
  return await HTTP_CLIENT.post(`/contact-us`, params);
};
const handleVerifyJwt = async () => {
  return await HTTP_CLIENT.get("/auth/verify-jwt");
};
const handleSettings = async () => {
  return await HTTP_CLIENT.get("/settings");
};
const EditUserEmail = async (params: { name: string; email: string }) => {
  return await HTTP_CLIENT.post("/user/edit", params);
};
const UserInfo = async () => {
  return await HTTP_CLIENT.get("/user/info");
};

export {
  handleUserLogin,
  handleUserRegister,
  handleVerifyJwt,
  handleChangePassword,
  handleForgotPassword,
  handleCreateNewPassword,
  handlePinVerification,
  handleSettings,
  handleCloseBeta,
  handleUserReports,
  EditUserEmail,
  UserInfo,
};
