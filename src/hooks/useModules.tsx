import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useModules = () => {
  const axiosPublic = useAxios();
  const {
    data: allModules,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["allModules"],
    queryFn: async () => {
      const res = await axiosPublic.get("/modules/allModules");
      // // console.log(res.data.data);
      return res.data.data;
    },
  });
  return { allModules, loading, refetch };
};
export default useModules;
