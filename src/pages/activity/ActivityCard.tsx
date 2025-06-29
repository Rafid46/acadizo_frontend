/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiDownload } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import moment from "moment-timezone";
import { Modal } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
const ActivityCard = ({ allActivities }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">
      <style>
        {` 
          .ant-btn-variant-solid{
              background-color: #7ABA78 !important;
        }
        `}
      </style>
      <div className="flex items-center justify-between mt-5">
        <div className="relative mt-2 w-full">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
          <input
            type="text"
            placeholder="Search activities...."
            className="block w-full rounded-xl border border-neutral-300 bg-transparent py-[11px] pl-10 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-[#7ABA78] focus:outline-none focus:ring-neutral-950/5"
          />
          <div className="absolute inset-y-1 right-1 flex justify-end p-1">
            <button
              type="submit"
              aria-label="Submit"
              className="flex aspect-square h-full items-center justify-center rounded-lg bg-[#7ABA78] text-white transition hover:bg-neutral-800"
            >
              <IoIosSearch />
            </button>
          </div>
        </div>
        <div className=" cursor-pointer hover:bg-gray-100 hover:rounded-full p-2 ml-5">
          <CgMenuGridO className="text-[30px] text-gray-500" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl px-5 pt-5 pb-2 mt-4">
        {allActivities?.map((activity: any) => (
          <div
            onClick={() => {
              setOpen(true);
              setSelectedItem(activity);
            }}
            className="group w-full border-slate-200 border bg-white  rounded-xl overflow-hidden px-6 py-6 gap-y-4 mb-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold  bg-[#DDF6D2] py-[2px] px-[8px] rounded-full w-fit text-secondary-color mb-2">
                  {activity?.createdAt &&
                    moment(activity?.createdAt)
                      .tz("Asia/Dhaka")
                      .format("D MMMM YYYY . h:mm A")}
                </p>
                <svg
                  className="hidden group-hover:block fill-current stroke-current w-10 h-10 p-2 hover:bg-lime-200  rounded-full m-1"
                  height="100"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  width="100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    className=""
                    d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                  ></path>
                </svg>
              </div>
              <h2 className="text-lg font-semibold">
                {activity?.activityTitle}
              </h2>
              <h2 className="text-lg font-semibold">
                <p>
                  {activity.activityDate && (
                    <p>
                      {activity.activityDate
                        .split(",")
                        .map((date: any) =>
                          date.split(" ").slice(0, 4).join(" ")
                        )
                        .join(" -- ")}
                    </p>
                  )}
                </p>
              </h2>
              <p className="text-sm text-zinc-900">{activity?.createdBy}</p>
            </div>

            <div className="">
              <div className="text-sm text-gray-500 flex flex-col">
                <div
                  className="prose prose-sm break-words overflow-hidden text-ellipsis max-w-full"
                  dangerouslySetInnerHTML={{
                    __html: activity?.activityDescription || "",
                  }}
                ></div>

                {!activity?.file ? (
                  <div className="text-md text-gray-300 mt-2 italic ">
                    No attachments
                  </div>
                ) : (
                  <div className="w-fit">
                    {activity?.file && (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`http://localhost:3000/file/${activity?.file}`}
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
                                  {activity?.file?.length >= 15
                                    ? `${activity?.file?.substring(0, 15)}...`
                                    : activity?.file}
                                </p>
                                <p className="text-gray-500">Attachment</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDownload(activity?.file)}
                              className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                            >
                              <BiDownload />
                            </button>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="flex  justify-start gap-x-4 text-sm text-zinc-400 mt-5">
                <div className="flex items-center space-x-1 cursor-pointer">
                  ❤️ <span>22</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer">
                  💬 <span>12</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer">
                  👁️ <span>332</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modal
          title={selectedItem?.activityTitle}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <div>
            <div
              className="break-words overflow-hidden text-ellipsis max-w-full bg-gray-50 p-4 rounded-lg text-gray-800"
              dangerouslySetInnerHTML={{
                __html: selectedItem?.activityDescription || "",
              }}
            ></div>
          </div>{" "}
        </Modal>
      </div>
    </div>
  );
};

export default ActivityCard;
