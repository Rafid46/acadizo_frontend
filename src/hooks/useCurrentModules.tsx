/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useModules from "./useModules";

const useCurrentModules = () => {
  const [matchedModules, setMatchedModules] = useState<any[]>([]);
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { allModules, loading: isModulesLoading } = useModules();
  const isLoading = isModulesLoading || isUserLoading;
  useEffect(() => {
    if (isLoading || !allModules || !currentUser) {
      setMatchedModules([]);
      return;
    }

    const filteredModules = allModules?.filter(
      (item: any) =>
        item?.academyName?.trim().toLowerCase() ===
        currentUser?.academyName?.trim().toLowerCase()
    );

    setMatchedModules((prevModules) =>
      JSON.stringify(prevModules) === JSON.stringify(filteredModules)
        ? prevModules
        : filteredModules
    );
  }, [allModules, currentUser, isLoading]);

  return { matchedModules, isLoading };
};
export default useCurrentModules;
