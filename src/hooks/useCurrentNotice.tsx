/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import useNotice from "./useNotice";

const useCurrentNotice = () => {
  const { data: currentUser }: any = useCurrentUser();
  const { data: allNotices }: any = useNotice();
  const [matchedNotices, setMatchedNotices] = useState<any[]>([]);
  useEffect(() => {
    if (allNotices && currentUser) {
      const filteredNotices = allNotices?.filter(
        (item: any) => item?.academyName === currentUser?.academyName
      );
      setMatchedNotices(filteredNotices);
    }
  }, [allNotices, currentUser]);
  return matchedNotices;
};

export default useCurrentNotice;
