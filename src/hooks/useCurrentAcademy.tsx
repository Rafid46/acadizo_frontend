/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "./useAxios";

const useCurrentAcademy = () => {
  const { user }: any = useContext(AuthContext);
  const axiosPublic = useAxios();

  const {
    data: currentAcademy = null,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userEmail"],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/academy/academyList/${user?.email}`);
      console.log(currentAcademy);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  return { currentAcademy, isLoading, isError, refetch };
};

export default useCurrentAcademy;
