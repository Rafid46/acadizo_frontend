import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useModules = () => {
  const axiosPublic = useAxios();
  const { data: allModules, isLoading: loading } = useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const res = await axiosPublic.get("/modules/allModules");
      console.log(res.data.data);
      return res.data.data;
    },
  });
  return { allModules, loading };
};
export default useModules;
