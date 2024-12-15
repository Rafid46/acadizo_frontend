import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

// Define a type for the user data

const useNotice = () => {
  const axiosPublic = useAxios();

  const allNotices = useQuery({
    queryKey: ["academyNotices"],
    queryFn: async () => {
      const res = await axiosPublic.get("/academy/notices");
      console.log(res.data.data);
      return res.data.data;
    },
  });

  return { ...allNotices, refetch: allNotices.refetch };
};

export default useNotice;
