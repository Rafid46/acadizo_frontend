/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "./useAxios";

const useCurrentUser = () => {
  const { user }: any = useContext(AuthContext);
  const axiosPublic = useAxios();

  const {
    data: currentUser = null,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/api/v1/user/${user?.email}`);
      return res.data.data;
      console.log(currentUser);
    },
    enabled: !!user?.email,
  });

  return { currentUser, isLoading, isError, refetch };
};

export default useCurrentUser;
