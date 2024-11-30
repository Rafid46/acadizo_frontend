import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAcademies = () => {
  const axiosPublic = useAxios();

  const getAllAcademies = useQuery({
    queryKey: ["academyLists"],
    queryFn: async () => {
      const res = await axiosPublic.get("/academy/academyList");
      console.log(res.data.data);
      return res.data.data;
    },
  });
  return { ...getAllAcademies };
};

export default useAcademies;
