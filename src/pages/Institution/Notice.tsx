/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useNotice from "../../hooks/useNotice";
import moment from "moment";
import { FaRegFileAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";

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
  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {matchedNotices?.length === 0 ? (
        <div className="flex items-center justify-center text-gray-500">
          No notices available
        </div>
      ) : (
        <div>
          {matchedNotices?.map((item: any) => (
            <article className="rounded-xl  p-0.5  mb-5 border-2 border-gray-200">
              <div className="rounded-[10px] bg-white p-4 sm:p-6">
                <time className="block text-xs text-gray-500">
                  {moment(item?.createdAt).format("MMMM D, YYYY")}{" "}
                </time>

                <div className="mt-5">
                  <h3 className="mt-0.5 text-sm text-gray-600 bg-gray-200 p-2 rounded-lg w-fit mb-2">
                    {item?.title}:
                  </h3>
                  <h3 className="mt-0.5 text-lg font-medium text-gray-600">
                    {item?.description}
                  </h3>

                  {item?.file && (
                    <a
                      href={`http://localhost:3000/file/${item?.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50 mt-3">
                        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
                          <div className="flex gap-2">
                            <div className="text-primary-color text-3xl">
                              <FaRegFileAlt />
                            </div>
                            <div>
                              <p className="text-white">
                                {item?.file?.length >= 15
                                  ? `${item?.file?.substring(0, 15)}...`
                                  : item?.file}
                              </p>
                              <p className="text-gray-500">Attachment</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(item?.file)}
                            className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                          >
                            <BiDownload />
                          </button>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notice;
