/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiDownload, BiEdit } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosSearch, IoMdTime } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment-timezone";
import {
  Avatar,
  Badge,
  Button,
  Collapse,
  Divider,
  Dropdown,
  Form,
  Modal,
  Space,
  theme,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import empty from "../../assets/images/emptypng.png";
import Loader from "../../common/Loader";
import EditButtons from "../EditButtons";
import Dragger from "antd/es/upload/Dragger";
import { RiUploadCloudLine } from "react-icons/ri";
import { EditorContent } from "@tiptap/react";

import { GrFormAttachment } from "react-icons/gr";
import { FcOvertime } from "react-icons/fc";
import { LucideUsersRound, Users } from "lucide-react";
import useTiptapEditor from "../../hooks/useTiptapEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "../../common/Toast";
import useAxios from "../../hooks/useAxios";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAcademies from "../../hooks/useAcademies";
import { MdDeleteOutline, MdOutlineMail } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
const ActivityCard = ({ allActivities, loading }: any) => {
  const [open, setOpen] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { token } = theme.useToken();
  const editor = useTiptapEditor();
  const axiosPublic = useAxios();
  const { data: currentUser } = useCurrentUser();
  const { data: academyLists } = useAcademies();
  const queryClient = useQueryClient();
  // const editorRef = useRef<any>(null);
  const { mutate: postAnswer, isLoading: isSubmitting }: any = useMutation({
    mutationKey: ["postAnswer"],
    mutationFn: async ({
      answerData,
      activityId,
    }: {
      answerData: any;
      activityId: string;
    }) => {
      return await axiosPublic.post(
        `/activity/${activityId}/answer`,
        answerData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allActivities"] });
      const showNotification = Toast({
        type: "success",
        message: "Answer submitted successfully",
        description: "Answer submitted successfully",
      });
      form.resetFields();
      setSelectedFile(null);
      showNotification();
    },
    onError: (error: any) => {
      console.error("error posting", error);
    },
  });
  // const onFinish = () => {
  //   const currentUserEmail = currentUser?.email;
  //   const joinedAcademyDetails = academyLists?.find((item: any) =>
  //     item?.academyMembers?.some(
  //       (member: any) => member?.email === currentUserEmail
  //     )
  //   );

  //   const activityId = selectedItem?.activityId;
  //   const studentId = currentUser?.id;
  //   const studentFirstName = currentUser?.firstName;
  //   const studentLastName = currentUser?.lastName;
  //   const studentEmail = currentUser?.email;
  //   const academyId = joinedAcademyDetails?.academyId;
  //   const academyName = joinedAcademyDetails?.academyName;

  //   // Validation
  //   if (!activityId) {
  //     console.error("No activity id selected");
  //     return;
  //   }

  //   if (!studentId) {
  //     console.error("No student id found");
  //     return;
  //   }

  //   if (!academyId) {
  //     console.error("No academy found for current user");
  //     return;
  //   }
  //   if (!studentFirstName || !studentLastName || !studentEmail) {
  //     console.error("No name found for current user");
  //     return;
  //   }

  //   const answerDescription = editor?.getHTML() || "";

  //   // Check if answer description is empty (excluding HTML tags)
  //   const textContent = editor?.getText() || "";
  //   if (!textContent.trim()) {
  //     const showNotification = Toast({
  //       type: "error",
  //       message: "Please provide an answer",
  //       description: "Answer description cannot be empty",
  //     });
  //     showNotification();
  //     return;
  //   }

  //   const answerFormData = new FormData();
  //   answerFormData.append("answerDescription", answerDescription);
  //   answerFormData.append("academyId", academyId);
  //   answerFormData.append("academyName", academyName);
  //   answerFormData.append("studentId", studentId);
  //   answerFormData.append("firstName", studentFirstName);
  //   answerFormData.append("lastName", studentLastName);
  //   answerFormData.append("studentEmail", studentEmail);

  //   if (selectedFile) {
  //     answerFormData.append("file", selectedFile);
  //   }

  //   console.log("Submitting answer for activity:", selectedItem);
  //   console.log("Activity ID:", activityId);

  //   postAnswer({ answerData: answerFormData, activityId });
  // };
  const onFinish = () => {
    const student = {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      photoURL: currentUser?.photoURL,
      id: currentUser?.id,
    };
    const currentUserEmail = currentUser?.email;
    const joinedAcademyDetails = academyLists?.find((item: any) =>
      item?.academyMembers?.some(
        (member: any) => member?.email === currentUserEmail
      )
    );
    const activityId = selectedItem?.activityId;
    const academyId = joinedAcademyDetails?.academyId;
    const academyName = joinedAcademyDetails?.academyName;
    const answerFormData = new FormData();
    answerFormData.append("answerDescription", editor?.getHTML() || "");
    answerFormData.append("academyId", academyId);
    answerFormData.append("academyName", academyName);
    answerFormData.append("student", JSON.stringify(student)); // send full user
    if (selectedFile) {
      answerFormData.append("file", selectedFile);
    }

    postAnswer({ answerData: answerFormData, activityId });
  };

  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteModule = useMutation({
    mutationKey: ["deleteActivity"],
    mutationFn: (activityId: string) => {
      return axiosPublic.delete(`/activity/${activityId}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allActivities"] });
      Toast({
        type: "success",
        message: "Activity deleted successfully",
        description: "Activity deleted successfully",
      });
    },
    onError: (error: any) => {
      console.error("Error deleting activity:", error);
      Toast({
        type: "error",
        message: "Failed to delete activity",
        description: "An error occurred while deleting the activity.",
      });
    },
  });

  const handleDeleteActivity = (activityId: string) => {
    deleteModule.mutate(activityId);
  };
  return (
    <div className="">
      <style>
        {` 
          .ant-btn-variant-solid{
              background-color: #7ABA78 !important;
        }
          .ant-collapse {
              background: #F9FAFB !important;
        }
        `}
      </style>
      <>
        {loading ? (
          <Loader />
        ) : allActivities?.length > 0 ? (
          <>
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

            {/* card */}
            <div className="bg-gray-50 rounded-2xl px-5 pt-5 pb-2 mt-4">
              <AnimatePresence>
                {allActivities?.map((activity: any, index: number) => (
                  // main card
                  <motion.div
                    key={activity?.activityId}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className=""
                  >
                    <div
                      onClick={() => {
                        setOpen(true);
                        setSelectedItem(activity);
                      }}
                      className="group w-full border-slate-400 border bg-white  rounded-xl overflow-hidden px-6 py-6 gap-y-4 mb-4 cursor-pointer transition-all duration-300 transform"
                    >
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 mb-2">
                            <IoMdTime />
                            <p className="text-[9px] font-semibold  bg-[#DDF6D2] py-[2px] px-[8px] rounded-full w-fit text-secondary-color">
                              {activity?.createdAt &&
                                moment(activity?.createdAt)
                                  .tz("Asia/Dhaka")
                                  .format("D MMMM YYYY . h:mm A")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setOpenAnswer(true);
                                setSelectedItem(activity);
                              }}
                            >
                              <Tooltip title="Submit your answer">
                                <IoBookSharp className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-4xl p-2 hover:bg-lime-200 rounded-full m-1" />
                              </Tooltip>
                            </div>
                            {currentUser?.role === "teacher" && (
                              <Dropdown
                                className="p-0"
                                destroyPopupOnHide={false}
                                trigger={["click", "hover"]}
                                menu={{
                                  items: [
                                    {
                                      key: "1",
                                      label: "Edit",
                                      icon: <BiEdit className="!text-xl" />,
                                      onClick: (e) => {
                                        e.domEvent.stopPropagation();
                                        // setTimeout(() => showEditDrawer(module), 0);
                                      },
                                    },
                                    {
                                      key: "2",
                                      label: <span>Delete</span>,
                                      icon: (
                                        <MdDeleteOutline className="!text-xl" />
                                      ),
                                      onClick: (e) => {
                                        {
                                          e.domEvent.stopPropagation();
                                          handleDeleteActivity(
                                            activity?.activityId
                                          );
                                        }
                                        // setTimeout(() => showEditDrawer(module), 0);
                                      },
                                    },
                                  ],
                                }}
                                arrow={{ pointAtCenter: true }}
                              >
                                <Button
                                  onClick={(e) => e.stopPropagation()}
                                  className="custom_button_style_icon"
                                >
                                  <Space>
                                    <SlOptionsVertical className="!text-lg" />
                                  </Space>
                                </Button>
                              </Dropdown>
                            )}
                          </div>
                        </div>

                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          {/* <GoDotFill className="text-blue-500" /> */}
                          <p className="bg-blue-500 rounded-full p-1 text-white text-xs w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </p>
                          {activity?.activityTitle}
                        </h2>

                        <p className="text-sm text-zinc-900">
                          {activity?.createdBy}
                        </p>
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
                            <div className="text-md text-gray-400 mt-2 italic flex items-center gap-2">
                              <GrFormAttachment className="text-2xl" />
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
                                              ? `${activity?.file?.substring(
                                                  0,
                                                  15
                                                )}...`
                                              : activity?.file}
                                          </p>
                                          <p className="text-gray-500">
                                            Attachment
                                          </p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() =>
                                          handleDownload(activity?.file)
                                        }
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
                        {/* <div className="flex  justify-start gap-x-4 text-sm text-zinc-400 mt-5">
                      <div className="flex items-center space-x-1 cursor-pointer">
                        ❤️ <span>22</span>
                      </div>
                      <div className="flex items-center space-x-1 cursor-pointer">
                        💬 <span>12</span>
                      </div>
                      <div className="flex items-center space-x-1 cursor-pointer">
                        👁️ <span>332</span>
                      </div>
                    </div> */}
                      </div>
                      <div
                        className="mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Collapse
                          bordered={false}
                          // expandIcon={({ isActive }) => (
                          //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
                          // )}
                          style={{ background: token.colorBgContainer }}
                          defaultActiveKey={["1"]}
                          items={[
                            {
                              key: "1",
                              label: (
                                <div className="-mt-[5px]">
                                  <div className="flex items-center gap-x-2">
                                    <p className="text-gray-600 flex items-center gap-x-2">
                                      <LucideUsersRound width={18} />
                                      <p className="font-semibold text-sm">
                                        {" "}
                                        Students answer
                                      </p>
                                    </p>
                                    <Avatar.Group maxCount={5}>
                                      {activity?.answers?.map(
                                        (answer: any, index: number) => (
                                          <Tooltip
                                            key={answer?.student?.id || index}
                                            title={`${answer?.student?.firstName} ${answer?.student?.lastName}`}
                                          >
                                            <Avatar
                                              src={
                                                answer?.student?.photoURL ||
                                                "/placeholder.svg"
                                              }
                                            />
                                          </Tooltip>
                                        )
                                      )}
                                    </Avatar.Group>
                                    <p className="text-[10px] font-semibold bg-[#f1d1ef] py-[2px] px-[8px] rounded-full w-fit text-purple-600">
                                      {activity?.answers?.length || 0}
                                      <span className="ml-1">responses</span>
                                    </p>
                                  </div>
                                  <Divider className="mt-2 border-blue-100 mb-0" />
                                </div>
                              ),
                              children: (
                                <div className="space-y-4">
                                  {currentUser?.role === "student" ||
                                  activity?.answers?.student?.id ===
                                    currentUser?.id ? (
                                    <>
                                      {activity?.answers &&
                                      activity?.answers.length > 0 ? (
                                        activity.answers
                                          ?.filter(
                                            (ans: any) =>
                                              currentUser?.role === "student" &&
                                              ans?.student?.id ===
                                                currentUser?.id
                                          )
                                          ?.map(
                                            (answer: any, index: number) => (
                                              <div
                                                key={index}
                                                className="bg-white border-[1px] p-3 rounded-lg"
                                              >
                                                <div className="pb-3">
                                                  <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                      <Avatar
                                                        size={40}
                                                        src={
                                                          answer?.student
                                                            ?.photoURL
                                                        }
                                                      />
                                                      <div>
                                                        <h3 className="font-semibold text-md text-slate-800 leading-[13px]">
                                                          {
                                                            answer?.student
                                                              ?.firstName
                                                          }{" "}
                                                          {
                                                            answer?.student
                                                              ?.lastName
                                                          }
                                                          {
                                                            answer?.student
                                                              ?.academyName
                                                          }{" "}
                                                          {
                                                            answer?.student
                                                              ?.gender
                                                          }
                                                        </h3>
                                                        <p className="text-[11px] text-slate-500">
                                                          {
                                                            answer?.student
                                                              ?.email
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="space-y-4">
                                                  {/* Answer Content */}
                                                  <div className="bg-slate-100 rounded-lg p-4 border-l-4 border-l-blue-500">
                                                    <div
                                                      className="prose prose-sm break-words"
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          answer?.answerDescription ||
                                                          "<p>No description provided</p>",
                                                      }}
                                                    />
                                                  </div>

                                                  {/* Attachments */}
                                                  {!answer?.file ? (
                                                    <div className="text-md text-gray-400 mt-2 italic flex items-center">
                                                      <GrFormAttachment className="text-2xl" />
                                                      No attachments
                                                    </div>
                                                  ) : (
                                                    <div className="!w-full">
                                                      <a
                                                        onClick={(e) =>
                                                          e.stopPropagation()
                                                        }
                                                        href={`http://localhost:3000/file/${answer?.file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                      >
                                                        <div className="flex flex-col gap-2 w-full text-[10px] sm:text-xs z-50 mt-3">
                                                          <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#292b33] px-[10px]">
                                                            <div className="flex gap-2">
                                                              <div className="text-primary-color text-3xl">
                                                                <FaRegFileAlt />
                                                              </div>

                                                              <div>
                                                                <p className="text-white">
                                                                  {answer?.file
                                                                    ?.length >=
                                                                  15
                                                                    ? `${answer?.file?.substring(
                                                                        0,
                                                                        15
                                                                      )}...`
                                                                    : answer?.file}
                                                                </p>
                                                                <p className="text-gray-500">
                                                                  Attachment
                                                                </p>
                                                              </div>
                                                            </div>
                                                            <button
                                                              onClick={() =>
                                                                handleDownload(
                                                                  answer?.file
                                                                )
                                                              }
                                                              className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                                                            >
                                                              <BiDownload />
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </a>
                                                    </div>
                                                  )}
                                                  <div className="flex items-center gap-2 mt-2">
                                                    <FcOvertime />
                                                    <p className="text-[10px] text-gray-500 mt-1">
                                                      Submitted at:{" "}
                                                      {moment(
                                                        answer?.student
                                                          ?.createdAt
                                                      )
                                                        .tz("Asia/Dhaka")
                                                        .format(
                                                          "D MMM YYYY, h:mm A"
                                                        )}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )
                                      ) : (
                                        <p className="text-gray-400 italic">
                                          No answers submitted yet.
                                        </p>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {activity?.answers &&
                                      activity?.answers.length > 0 ? (
                                        activity.answers?.map(
                                          (answer: any, index: number) => (
                                            <div
                                              key={index}
                                              className="bg-white border-[1px] p-3 rounded-lg"
                                            >
                                              <div className="pb-3">
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-3">
                                                    <Avatar
                                                      size={40}
                                                      src={
                                                        answer?.student
                                                          ?.photoURL
                                                      }
                                                    />
                                                    <div>
                                                      <h3 className="font-semibold text-md text-slate-800 leading-[13px]">
                                                        {
                                                          answer?.student
                                                            ?.firstName
                                                        }{" "}
                                                        {
                                                          answer?.student
                                                            ?.lastName
                                                        }
                                                        {
                                                          answer?.student
                                                            ?.academyName
                                                        }{" "}
                                                        {
                                                          answer?.student
                                                            ?.gender
                                                        }
                                                      </h3>
                                                      <p className="text-[11px] text-slate-500">
                                                        {answer?.student?.email}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="space-y-4">
                                                {/* Answer Content */}
                                                <div className="bg-slate-100 rounded-lg p-4 border-l-4 border-l-blue-500">
                                                  <div
                                                    className="prose prose-sm break-words"
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        answer?.answerDescription ||
                                                        "<p>No description provided</p>",
                                                    }}
                                                  />
                                                </div>

                                                {/* Attachments */}
                                                {!answer?.file ? (
                                                  <div className="text-md text-gray-400 mt-2 italic flex items-center">
                                                    <GrFormAttachment className="text-2xl" />
                                                    No attachments
                                                  </div>
                                                ) : (
                                                  <div className="!w-full">
                                                    <a
                                                      onClick={(e) =>
                                                        e.stopPropagation()
                                                      }
                                                      href={`http://localhost:3000/file/${answer?.file}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      download
                                                    >
                                                      <div className="flex flex-col gap-2 w-full text-[10px] sm:text-xs z-50 mt-3">
                                                        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#292b33] px-[10px]">
                                                          <div className="flex gap-2">
                                                            <div className="text-primary-color text-3xl">
                                                              <FaRegFileAlt />
                                                            </div>

                                                            <div>
                                                              <p className="text-white">
                                                                {answer?.file
                                                                  ?.length >= 15
                                                                  ? `${answer?.file?.substring(
                                                                      0,
                                                                      15
                                                                    )}...`
                                                                  : answer?.file}
                                                              </p>
                                                              <p className="text-gray-500">
                                                                Attachment
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <button
                                                            onClick={() =>
                                                              handleDownload(
                                                                answer?.file
                                                              )
                                                            }
                                                            className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                                                          >
                                                            <BiDownload />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </a>
                                                  </div>
                                                )}
                                                <div className="flex items-center gap-2 mt-2">
                                                  <FcOvertime />
                                                  <p className="text-[10px] text-gray-500 mt-1">
                                                    Submitted at:{" "}
                                                    {moment(
                                                      answer?.student?.createdAt
                                                    )
                                                      .tz("Asia/Dhaka")
                                                      .format(
                                                        "D MMM YYYY, h:mm A"
                                                      )}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <p className="text-gray-400 italic">
                                          No answers submitted yet.
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                              ),
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Modal
                footer={null}
                title={`Submit your answer - ${selectedItem?.activityTitle}`}
                centered
                open={openAnswer}
                onOk={() => setOpenAnswer(false)}
                onCancel={() => setOpenAnswer(false)}
              >
                <div>
                  <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    encType="multipart/form-data"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      // name="activityDescription"
                      label={
                        <p className="text-sm font-semibold text-gray-500">
                          Description
                        </p>
                      }
                      rules={[
                        {
                          required: true,
                          message: "please enter description",
                        },
                      ]}
                    >
                      {editor && <EditButtons editor={editor} />}
                      {editor && (
                        <EditorContent
                          placeholder="Write something..."
                          editor={editor}
                          className="bg-gray-50 rounded-xl p-4 w-full max-w-full overflow-x-hidden"
                        />
                      )}
                    </Form.Item>
                    <Form.Item
                      label={
                        <p className="text-sm font-semibold text-gray-500">
                          Attachment
                        </p>
                      }
                    >
                      <Dragger
                        name="file"
                        beforeUpload={() => false}
                        multiple={false}
                        onChange={({ fileList }) => {
                          const singleFile = fileList[0]?.originFileObj;
                          setSelectedFile(singleFile || null);
                        }}
                        fileList={
                          selectedFile
                            ? [{ uid: "", name: selectedFile?.name }]
                            : []
                        }
                        onRemove={() => setSelectedFile(null)}
                      >
                        <p className="flex items-center justify-center text-3xl">
                          <RiUploadCloudLine className="text-purple-400" />
                        </p>
                        <p className="text-gray-500">
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button
                          onClick={() => setOpenAnswer(false)}
                          className="custom_button_style_secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          htmlType="submit"
                          onClick={() => setOpenAnswer(false)}
                          type="primary"
                          className="custom_button_style"
                          loading={isSubmitting}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Answer"}
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
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
                </div>
                {!selectedItem?.file ? (
                  <div className="text-md text-gray-400 mt-2 italic flex items-center">
                    <GrFormAttachment className="text-2xl" />
                    No attachments
                  </div>
                ) : (
                  <div className="!w-full">
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={`http://localhost:3000/file/${selectedItem?.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <div className="flex flex-col gap-2 w-full text-[10px] sm:text-xs z-50 mt-3">
                        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#292b33] px-[10px]">
                          <div className="flex gap-2">
                            <div className="text-primary-color text-3xl">
                              <FaRegFileAlt />
                            </div>

                            <div>
                              <p className="text-white">
                                {selectedItem?.file?.length >= 15
                                  ? `${selectedItem?.file?.substring(0, 15)}...`
                                  : selectedItem?.file}
                              </p>
                              <p className="text-gray-500">Attachment</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(selectedItem?.file)}
                            className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                          >
                            <BiDownload />
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-lg font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-600" />
                      Responses
                      <Badge count={selectedItem?.answers?.length || 0} />
                    </span>
                  </p>
                  {selectedItem?.answers && selectedItem?.answers.length > 0 ? (
                    selectedItem.answers?.map((answer: any) => (
                      <div>
                        <div className="mt-3">
                          <div className="flex items-center gap-3">
                            <Avatar
                              size={40}
                              src={answer?.student?.photoURL}
                              className="w-8 h-8"
                            ></Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-700">
                                {answer?.student?.firstName}{" "}
                                {answer?.student?.lastName}
                              </p>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MdOutlineMail className="text-sm" />
                                {answer?.student?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">
                      No answers submitted yet.
                    </p>
                  )}
                </div>
              </Modal>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <img
              src={empty}
              className="!sm:w-[200px] md:w-[200px] lg:w-[500px]"
              alt=""
            />
          </div>
        )}
        {/* {allActivities?.length === 0 || !allActivities ? (
          <div className="flex items-center justify-center h-[60vh]">
            <img
              src={empty}
              className="!sm:w-[200px] md:w-[200px] lg:w-[500px]"
              alt=""
            />
          </div>
        ) : (
          <>
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
                    <p className="text-sm text-zinc-900">
                      {activity?.createdBy}
                    </p>
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
                                          ? `${activity?.file?.substring(
                                              0,
                                              15
                                            )}...`
                                          : activity?.file}
                                      </p>
                                      <p className="text-gray-500">
                                        Attachment
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleDownload(activity?.file)
                                    }
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
          </>
        )} */}
      </>
    </div>
  );
};

export default ActivityCard;
