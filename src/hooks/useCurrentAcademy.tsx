// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../providers/AuthProvider";
// import useAxios from "./useAxios";

// const useCurrentAcademy = () => {
//   const { user }: any = useContext(AuthContext);
//   const axiosPublic = useAxios();

//   const {
//     data: currentAcademy = null,
//     refetch,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["userEmail"],
//     queryFn: async () => {
//       if (!user?.email) return null;
//       const res = await axiosPublic.get(`/academy/academyList/${user?.email}`);
//       console.log(currentAcademy);
//       return res.data.data;
//     },
//     enabled: !!user?.email,
//   });

//   return { currentAcademy, isLoading, isError, refetch };
// };

// export default useCurrentAcademy;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useAcademies from "./useAcademies";

const useCurrentAcademy = () => {
  const [matchedAcademy, setMatchedAcademy] = useState<any[]>([]);
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { data: allAcademies, loading: isAcademyLoading } = useAcademies();
  const isLoading = isAcademyLoading || isUserLoading;
  useEffect(() => {
    if (isLoading || !allAcademies || !currentUser) {
      setMatchedAcademy([]);
      return;
    }

    const filteredAcademies = allAcademies?.filter(
      (item: any) =>
        item?.academyName?.trim().toLowerCase() ===
        currentUser?.academyName?.trim().toLowerCase()
    );

    setMatchedAcademy((prevAcademies) =>
      JSON.stringify(prevAcademies) === JSON.stringify(filteredAcademies)
        ? prevAcademies
        : filteredAcademies
    );
  }, [allAcademies, currentUser, isLoading]);

  console.log("matchedAcademies", matchedAcademy);
  return { matchedAcademy, isLoading };
};
export default useCurrentAcademy;
