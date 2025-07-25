/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from "antd";
import { RiUploadCloudLine } from "react-icons/ri";

import EditButtons from "../EditButtons";
import { EditorContent } from "@tiptap/react";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import dayjs from "dayjs";
import { GrFormAttachment } from "react-icons/gr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Toast from "../../common/Toast";
import moment from "moment";
import { useTiptapEditor } from "../../hooks/useTiptapEditor";

const ActivityEditModule = ({
  setSelectedFile,
  selectedFile,
  openEditActivity,
  onCloseActivity,
  activity,
}: any) => {
  const { RangePicker } = DatePicker;
  const [, setEditorContent] = useState("");
  const [form] = Form.useForm();

  const editor = useTiptapEditor({
    content: form.getFieldValue("activityDescription") || "",
    shouldOptimizeRendering: true,
  });
  useEffect(() => {
    const value = form.getFieldValue("activityDescription");
    if (value) {
      setEditorContent(value);
    }
  }, [form]);
  //   const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();
  const axiosPublic = useAxios();

  useEffect(() => {
    if (openEditActivity && activity) {
      form.setFieldsValue({
        activityTitle: activity?.activityTitle || "",
      });

      if (editor && activity?.activityDescription) {
        editor.commands.setContent(activity?.activityDescription);
      }
    }
  }, [openEditActivity, activity, editor, form]);

  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const startDate = (date?: string) => {
  //   if (!date) return "";
  //   const parts = date.split(",");
  //   if (parts.length < 2) return "";
  //   const datePart = parts[1]?.trim()?.split(" ");
  //   if (!datePart || datePart.length < 3) return "";
  //   return `${parts[0]?.trim()}, ${datePart[0]} ${datePart[1]} ${datePart[2]}`;
  // };
  // const endDate = (date?: string) => {
  //   if (!date) return "";
  //   const parts = date.split(",");
  //   if (parts.length < 4) return "";
  //   const datePart = parts[3]?.trim()?.split(" ");
  //   if (!datePart || datePart.length < 3) return "";
  //   return `${parts[2]?.trim()}, ${datePart[0]} ${datePart[1]} ${datePart[2]}`;
  // };

  const { mutate: updateActivity, isLoading: isUpdateLoading }: any =
    useMutation({
      mutationKey: ["updateModule"],
      mutationFn: async ({ activityId, activityData }: any) => {
        return await axiosPublic.patch(
          `/activity/${activityId}/update`,
          activityData
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allActivities"] });
        const showNotification = Toast({
          type: "success",
          message: "Activity updated successfully",
          description: "",
        });
        showNotification();
        form.resetFields();
        setSelectedFile(null);
        onCloseActivity();
      },

      onError: (error: any) => {
        console.error("Error updating module", error);
        const showNotification = Toast({
          type: "success",
          message: "Activity updated successfully",
          description: "",
        });
        showNotification();
      },
    });

  //   const onFinish = (values: any) => {
  //     const { activityTitle, activityDate } = values;
  //     // const currentUserEmail = currentUser?.email;
  //     // const joinedAcademyDetails = academyLists?.find((item: any) =>
  //     //   item?.academyMembers?.some(
  //     //     (member: any) => member?.email === currentUserEmail
  //     //   )
  //     // );
  //     // const academyId = joinedAcademyDetails?.academyId;
  //     // const academyName = joinedAcademyDetails?.academyName;

  //     // const formattedDate =
  //     //   activityDate && Array?.isArray(activityDate)
  //     //     ? `${activityDate[0]?.format("YYYY-MM-DD")}, ${activityDate[1]?.format(
  //     //         "YYYY-MM-DD"
  //     //       )}`
  //     //     : "";

  //     const description = editor?.getHTML() || "";
  //     const activityFormdata = new FormData();
  //     activityFormdata.append("activityTitle", activityTitle);
  //     activityFormdata.append("activityDescription", description);
  //     activityFormdata.append(
  //       "activityDate",
  //       activityDate || values?.activityDate || " "
  //     );

  //     if (selectedFile) {
  //       activityFormdata.append("file", selectedFile);
  //     }
  //     updateActivity({
  //       activityId: activity?.activityId,
  //       activityData: activityFormdata,
  //     });
  //   };

  //   useEffect(() => {
  //     if (activity) {
  //       form.setFieldsValue({
  //         activityTitle: activity?.activityTitle,
  //         activityDate: activity?.activityDate,
  //       });
  //       //   setContent(activity?.description || "");
  //     }
  //   }, [activity, form]);

  const parseDateRange = (dateString: string) => {
    if (!dateString) return undefined;

    try {
      const dates = dateString.split(",").map((d) => d.trim());
      if (dates.length === 2) {
        return [dayjs(dates[0]), dayjs(dates[1])];
      }
      return undefined;
    } catch (error: any) {
      return undefined;
    }
  };
  useEffect(() => {
    if (openEditActivity && activity) {
      const parsedDates = parseDateRange(activity?.activityDate);

      form.setFieldsValue({
        activityTitle: activity?.activityTitle || "",
        activityDate: parsedDates || undefined, // must be `dayjs[]` or `undefined`
      });

      if (editor && activity?.activityDescription) {
        editor.commands.setContent(activity?.activityDescription);
      }
    }
  }, [openEditActivity, activity, editor, form]);

  const onFinish = (values: any) => {
    const { activityTitle, activityDate } = values;

    const description = editor?.getHTML() || "";

    const activityFormdata = new FormData();

    activityFormdata.append("activityTitle", activityTitle);
    activityFormdata.append("activityDescription", description);
    if (Array.isArray(activityDate) && activityDate.length === 2) {
      activityFormdata.append(
        "startDate",
        activityDate[0].format("YYYY-MM-DD")
      );
      activityFormdata.append("endDate", activityDate[1].format("YYYY-MM-DD"));
    }

    if (selectedFile) {
      activityFormdata.append("file", selectedFile);
    }

    updateActivity({
      activityId: activity?.activityId,
      activityData: activityFormdata,
    });
  };

  useEffect(() => {
    if (openEditActivity && activity) {
      form.setFieldsValue({
        activityTitle: activity?.activityTitle || "",
        activityDate: [dayjs(activity?.startDate), dayjs(activity?.endDate)],
      });

      if (editor && activity?.activityDescription) {
        editor.commands.setContent(activity?.activityDescription);
      }
    }
  }, [openEditActivity, activity, editor, form]);

  return (
    <div>
      <Drawer
        title="Edit Activity"
        width={720}
        onClose={onCloseActivity}
        open={openEditActivity}
        styles={{
          body: {
            padding: 20,
          },
        }}
        extra={
          <Space>
            <Button
              className="custom_button_style_secondary"
              onClick={onCloseActivity}
            >
              Cancel
            </Button>
            <Button
              disabled={isUpdateLoading}
              className="custom_button_style"
              onClick={() => {
                form.submit();
              }}
              type="primary"
              loading={isUpdateLoading}
              htmlType="submit"
            >
              {isUpdateLoading ? "Updating" : "Update"}
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          encType="multipart/form-data"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="activityTitle"
                label={
                  <p className="text-sm font-semibold text-gray-500">Title</p>
                }
              >
                <Input placeholder="e.g assignment name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="!mb-2"
                name="activityDate"
                label={
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                }
              >
                <RangePicker />
              </Form.Item>
              <p className="text-xs font-semibold text-gray-500 mt-0">
                Previous date:{" "}
                <span className="font-normal">
                  {moment(activity?.startDate).format("DD-MM-YYYY") ||
                    "Not set"}{" "}
                  -{" "}
                  {moment(activity?.endDate).format("DD-MM-YYYY") || "Not set"}
                </span>
              </p>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
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
              {
                <p className="text-sm font-semibold text-gray-500">
                  Previous attachments
                </p>
              }
              <div className="mb-5">
                {activity?.file ? (
                  <a
                    href={`https://acadizo-backend.onrender.com/file/${activity?.file}`}
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
                ) : (
                  <div className="text-md text-gray-400 mt-2 italic flex items-center">
                    <GrFormAttachment className="text-2xl" />
                    No attachments
                  </div>
                )}
              </div>
              <Form.Item
                label={
                  <p className="text-sm font-semibold text-gray-500">
                    Update Attachment
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
                      ? [{ uid: "", name: selectedFile?.name, status: "done" }]
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default ActivityEditModule;
