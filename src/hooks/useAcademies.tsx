// import { useQuery } from "@tanstack/react-query";
// import useAxios from "./useAxios";

// const useAcademies = () => {
//   const axiosPublic = useAxios();

//   const getAllAcademies = useQuery({
//     queryKey: ["academyLists"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/academy/academyList");
//       // console.log(res.data.data);
//       return res.data.data;
//     },
//   });
//   return { ...getAllAcademies, loading, refetch };
// };

// export default useAcademies;
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAcademies = () => {
  const axiosPublic = useAxios();
  const {
    data: allAcademies,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["allAcademies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/academy/academyList");
      // console.log(res.data.data);
      return res.data.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  console.log("all academies", allAcademies);
  return { data: allAcademies, loading, refetch };
};
export default useAcademies;
