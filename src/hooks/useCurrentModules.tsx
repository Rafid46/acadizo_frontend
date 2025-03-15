/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useModules from "./useModules";

const useCurrentModules = () => {
  const [matchedModules, setMatchedModules] = useState<any[]>([]);
  const { data: currentUser } = useCurrentUser();
  const { allModules } = useModules();

  useEffect(() => {
    console.log("✅ allModules:", allModules);
    console.log("✅ currentUser:", currentUser);

    if (!allModules || !currentUser) {
      // console.log("waiting for allModules or currentUser...");
      setMatchedModules([]);
      return;
    }

    const filteredModules = allModules?.filter(
      (item: any) =>
        item?.academyName?.trim().toLowerCase() ===
        currentUser?.academyName?.trim().toLowerCase()
    );

    // console.log("🔍 Filtered Modules:", filteredModules);
    setMatchedModules(filteredModules);
  }, [allModules, currentUser]);

  return matchedModules;
};
export default useCurrentModules;
