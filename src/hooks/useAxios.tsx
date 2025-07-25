import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://acadizo-backend.onrender.com",
});
const useAxios = () => {
  return axiosPublic;
};
export default useAxios;
