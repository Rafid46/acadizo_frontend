/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useActivities from "./useActivities";

const useCurrentActivities = () => {
  const [matchedActivity, setMatchedActivity] = useState<any[]>([]);
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { allActivities, loading: isModulesLoading } = useActivities();
  const isLoading = isModulesLoading || isUserLoading;
  useEffect(() => {
    if (isLoading || !allActivities || !currentUser) {
      setMatchedActivity([]);
      return;
    }

    const filteredActivities = allActivities?.filter(
      (item: any) =>
        item?.academyName?.trim().toLowerCase() ===
        currentUser?.academyName?.trim().toLowerCase()
    );

    setMatchedActivity((prevActivities) =>
      JSON.stringify(prevActivities) === JSON.stringify(filteredActivities)
        ? prevActivities
        : filteredActivities
    );
  }, [allActivities, currentUser, isLoading]);

  console.log("matchedActivities", matchedActivity);
  return { matchedActivity, isLoading };
};
export default useCurrentActivities;
