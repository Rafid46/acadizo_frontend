/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useNotice from "../../hooks/useNotice";
import moment from "moment";

const Notice = () => {
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

  // const notices = () => {
  //   return allNotices?.filter(
  //     (item: any) => item?.academyName === currentUser?.academyName
  //   );
  // };
  // const matchedNotice = notices();

  return (
    <div>
      {matchedNotices?.map((item: any) => (
        <article className="rounded-xl  p-0.5  mb-5 border-2 border-gray-200">
          <div className="rounded-[10px] bg-white p-4 sm:p-6">
            <time className="block text-xs text-gray-500">
              {moment(item?.createdAt).format("MMMM D, YYYY")}{" "}
            </time>

            <div className="mt-5">
              <h3 className="mt-0.5 text-base text-gray-400">{item?.title}:</h3>
              <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                {item?.description}
              </h3>
            </div>
            {/* 
            <div className="mt-4 flex flex-wrap gap-1">
              <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                Snippet
              </span>

              <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                JavaScript
              </span>
            </div> */}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Notice;
