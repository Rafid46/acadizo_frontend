import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://acadizo-backend.onrender.com",
});

const useAxios = () => {
  return axiosPublic;
};
axiosPublic.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default useAxios;
