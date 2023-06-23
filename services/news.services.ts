import { HTTP_CLIENT } from "../utilty/axiosClient";

const handleLatestNews = async (params?: any) => {
  return await HTTP_CLIENT.get(`/news?limit=${9}&page=${1}`);
};
const handleNewsLetter = async (params?: any) => {
  return await HTTP_CLIENT.post(`/newsletter`, params);
};
const handleNewsRecent = async () => {
  return await HTTP_CLIENT.get(`/news/recent?limit=${9}`);
};
const handleNewsRecentById = async (id: any) => {
  return await HTTP_CLIENT.get(`/news/${id}`);
};
const handleBlogById = async (id: any) => {
  return await HTTP_CLIENT.get(`/project-article/get-article/${id}`);
};

export {
  handleLatestNews,
  handleNewsLetter,
  handleNewsRecent,
  handleNewsRecentById,
  handleBlogById,
};
