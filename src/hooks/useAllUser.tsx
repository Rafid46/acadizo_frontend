import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAxios from "./useAxios";

// Define a type for the user data
interface User {
  id: string;
  role: "student" | "teacher";
  password: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  email: "string";
  contactNo: string;
  photoURL: string;
  // Add other fields as necessary
}

const useAllUser = () => {
  const axiosPublic = useAxios();

  const {
    data: AllUserInfo = [],
    isLoading, // Correct loading state
    isError,
    error,
    refetch,
  }: UseQueryResult<User[], Error> = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("http://localhost:3000/api/v1/user");
      console.log(res.data.data || res.data);
      return res.data.data || res.data;
    },
  });

  return [
    AllUserInfo,
    isLoading, // use isLoading instead of loading
    isError,
    error,
    refetch,
  ];
};

export default useAllUser;
