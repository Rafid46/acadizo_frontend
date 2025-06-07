/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  FloatButton,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
} from "antd";
import { FaPlus } from "react-icons/fa";
import { RiContactsBookUploadFill, RiUploadCloudLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import EditButtons from "../EditButtons";
import Dragger from "antd/es/upload/Dragger";
import useAxios from "../../hooks/useAxios";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAcademies from "../../hooks/useAcademies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "../../common/Toast";
import ActivityCard from "./ActivityCard";
import useCurrentActivities from "../../hooks/useCurrentAcitivies";

const ActivityPage = () => {
  const { RangePicker } = DatePicker;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const editorRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const axiosPublic = useAxios();
  const { data: currentUser } = useCurrentUser();
  const { data: academyLists } = useAcademies();
  const { matchedActivity: allActivities } = useCurrentActivities();
  const queryClient = useQueryClient();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Underline,
      TextStyle,
      Color,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
    ],
    onCreate: ({ editor }) => {
      editorRef.current = editor;
    },
    onUpdate: () => {
      // No state updates here to prevent re-renders
    },
  });

  const { mutate: postModule, isLoading }: any = useMutation({
    mutationKey: ["postActivity"],
    mutationFn: async (activityData: any) => {
      return await axiosPublic.post("/activity/createActivity", activityData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allActivities"] });
      const showNotification = Toast({
        type: "success",
        message: "Activity added successfully",
        description: "Activity added successfully",
      });
      form.resetFields();
      setSelectedFile(null);
      showNotification();
      onClose();
    },
    onError: (error: any) => {
      console.error("error posting", error);
    },
  });

  const onFinish = (values: any) => {
    const { activityTitle, activityDate } = values;
    console.log(values);
    const currentUserEmail = currentUser?.email;
    const joinedAcademyDetails = academyLists?.find((item: any) =>
      item?.academyMembers?.some(
        (member: any) => member?.email === currentUserEmail
      )
    );
    const teacherId = currentUser?.id;
    const teacherFirstName = currentUser?.firstName;
    const teacherLastName = currentUser?.lastName;
    const academyId = joinedAcademyDetails?.academyId;
    const academyName = joinedAcademyDetails?.academyName;
    const moduleFormData = new FormData();
    const activityDescription = editorRef.current.getHTML() || "";
    moduleFormData.append("activityTitle", activityTitle);
    moduleFormData.append("activityDescription", activityDescription);
    moduleFormData.append("activityDate", activityDate);
    moduleFormData.append("academyId", academyId);
    moduleFormData.append("academyName", academyName);
    moduleFormData.append("teacherId", teacherId);
    moduleFormData.append("firstName", teacherFirstName);
    moduleFormData.append("lastName", teacherLastName);
    if (selectedFile) {
      moduleFormData.append("file", selectedFile);
    }
    postModule(moduleFormData);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 pt-0">
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 45 }}
        icon={<FaPlus />}
      >
        {/* <FloatButton /> */}
        <Tooltip title="Upload">
          <FloatButton
            onClick={showDrawer}
            icon={<RiContactsBookUploadFill />}
          />
        </Tooltip>
      </FloatButton.Group>
      <Drawer
        title="Upload Activity"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            padding: 20,
          },
        }}
        extra={
          <Space>
            <Button className="custom_button_style_secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="custom_button_style"
              onClick={() => {
                form.submit();
              }}
              type="primary"
              loading={isLoading}
              htmlType="submit"
            >
              {isLoading ? "processing..." : "Submit"}
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
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="e.g assignment name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="activityDate"
                label={
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                }
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <RangePicker />
              </Form.Item>
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
                    selectedFile ? [{ uid: "", name: selectedFile?.name }] : []
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
      <div className="flex items-start gap-2">
        <p className="font-semibold text-2xl text-[#030712] mb-5">Activities</p>
      </div>
      <div>
        <ActivityCard allActivities={allActivities} />
      </div>
    </div>
  );
};

export default ActivityPage;
