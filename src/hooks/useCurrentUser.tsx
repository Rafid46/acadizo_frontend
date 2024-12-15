/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "./useAxios";

const useCurrentUser = () => {
  const { user }: any = useContext(AuthContext);
  const axiosPublic = useAxios();

  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/user/${user?.email}`);
      return res?.data?.data;
    },
    enabled: !!user?.email,
  });

  return { ...currentUser };
};

export default useCurrentUser;
