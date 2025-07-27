import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useActivities = () => {
  const axiosPublic = useAxios();
  const {
    data: allActivities,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["allActivities"],
    queryFn: async () => {
      const res = await axiosPublic.get("/activity/activityList");
      // // console.log(res.data.data);
      return res.data.data;
    },
  });
  // console.log("all activities", allActivities);
  return { allActivities, loading, refetch };
};
export default useActivities;
