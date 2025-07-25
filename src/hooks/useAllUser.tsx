import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

// Define a type for the user data

const useAllUser = () => {
  const axiosPublic = useAxios();

  const { data: allUsers, isLoading: loading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/user");
      // // console.log(res.data.data);
      return res.data.data;
    },
  });

  return { allUsers, loading };
};

export default useAllUser;
