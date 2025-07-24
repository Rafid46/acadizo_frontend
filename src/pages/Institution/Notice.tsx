/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useNotice from "../../hooks/useNotice";
import moment from "moment";
import { Bell, Download, FileText } from "lucide-react";
import { Button } from "antd";

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
        <div className="flex items-center justify-center text-gray-500 ">
          No notices available
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto p-5 pt-0">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Notice Board
              </h1>
            </div>
            <p className="text-slate-600">
              Stay updated with the latest announcements and important
              information
            </p>
          </div>
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
                      href={`https://acadizo-backend.onrender.com/file/${item?.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      {/* <div className="flex flex-col gap-2 w-full  text-[10px] sm:text-xs z-50 mt-3">
                        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#eff1fa] px-[10px]">
                          <div className="flex gap-2">
                            <div className="text-primary-color text-3xl">
                              <FaRegFileAlt />
                            </div>
                            <div>
                              <p className="text-zinc-800 text-[14px] font-semibold mb-2">
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
                      </div> */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-200 rounded-md">
                            <FileText className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">
                              {item?.file?.length >= 15
                                ? `${item?.file?.substring(0, 15)}...`
                                : item?.file}
                            </p>
                            <p className="text-xs text-slate-500">Attachment</p>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          onClick={() => handleDownload(item?.file)}
                          className="primary custom_button_style"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
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
