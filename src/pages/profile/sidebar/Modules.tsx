/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  ColorPicker,
  Drawer,
  FloatButton,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiMiniSquaresPlus } from "react-icons/hi2";

import { FaPlus } from "react-icons/fa";
import Dragger from "antd/es/upload/Dragger";
import { RiUploadCloudLine } from "react-icons/ri";
import useAcademies from "../../../hooks/useAcademies";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Toast from "../../../common/Toast";
import ModuleCard from "../../ModuleCard";
import EditorWrapper from "../../../common/EditorWrapper";
import { useTiptapEditor } from "../../../hooks/useTiptapEditor";
import Loader from "../../../common/Loader";
import { Link } from "react-router-dom";
const Modules = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [, setEditorContent] = useState("");
  // const [content, setContent] = useState<string>(value || "");
  const axiosPublic = useAxios();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { data: academyLists } = useAcademies();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  // const editorRef = useRef<any>(null);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const handleChange = (newContent: string) => {
  //   setContent(newContent);
  //   if (onChange) {
  //     onChange(newContent);
  //   }
  // };

  const { mutate: postModule, isLoading }: any = useMutation({
    mutationKey: ["postModule"],
    mutationFn: async (moduleData: any) => {
      return await axiosPublic.post("/modules/createModules", moduleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allModules"] });
      const showNotification = Toast({
        type: "success",
        message: "Module added successfully",
        description: "Module added successfully",
      });
      form.resetFields();
      setSelectedFile(null);
      editor.commands.clearContent();
      showNotification();
      onClose();
    },
    onError: (error: any) => {
      console.error("error posting", error);
    },
  });

  const onFinish = (values: any) => {
    const { title, heading, color } = values;
    // console.log(values);
    const currentUserEmail = currentUser?.email;
    const joinedAcademyDetails = academyLists?.find((item: any) =>
      item?.academyMembers?.some(
        (member: any) => member?.email === currentUserEmail
      )
    );
    const academyId = joinedAcademyDetails?.academyId;
    const academyName = joinedAcademyDetails?.academyName;
    const moduleFormData = new FormData();
    const description = editor.getHTML() || "";
    moduleFormData.append("title", title);
    moduleFormData.append("heading", heading);
    moduleFormData.append("description", description);
    moduleFormData.append("academyId", academyId);
    moduleFormData.append("academyName", academyName);
    moduleFormData.append("color", color || "#7ABA78");
    if (selectedFile) {
      moduleFormData.append("file", selectedFile);
    }
    postModule(moduleFormData);
  };

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { font: [] }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  // };
  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "list",
  //   "bullet",
  //   "link",
  //   "image",
  // ];
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
  return (
    <div>
      {/* <style>
        {`
        .ant-float-btn-body {
        background-color:#7ABA78 !important;

        }
          `}
      </style> */}

      {userLoading ? (
        <Loader />
      ) : currentUser?.academyName?.trim() && currentUser?.academyId?.trim() ? (
        <ModuleCard showDrawer={showDrawer} />
      ) : (
        <Link to="/dashboard/institution/overview">
          <Button type="primary" className="custom_button_style !h-[42px]">
            Join an academy to see modules
          </Button>
        </Link>
      )}
      {userLoading ? (
        <Loader />
      ) : currentUser?.academyName?.trim() && currentUser?.academyId?.trim() ? (
        currentUser?.role === "teacher" && (
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ insetInlineEnd: 45 }}
            icon={<FaPlus />}
          >
            {/* <FloatButton /> */}
            <Tooltip title="Add new module">
              <FloatButton onClick={showDrawer} icon={<HiMiniSquaresPlus />} />
            </Tooltip>
          </FloatButton.Group>
        )
      ) : null}

      <Drawer
        title="Add a module"
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
                name="heading"
                label={
                  <p className="text-sm font-semibold text-gray-500">Heading</p>
                }
                rules={[{ required: true, message: "Please enter heading " }]}
              >
                <Input placeholder="e.g chapter no" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="title"
                label={
                  <p className="text-sm font-semibold text-gray-500">Title</p>
                }
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="e.g chapter name" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                valuePropName="value"
                getValueFromEvent={(color) => color.toHexString()}
                name="color"
                label={
                  <p className="text-sm font-semibold text-gray-500">Color</p>
                }
              >
                <ColorPicker defaultValue="#1677ff" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                // name="description"
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
                <div className=" min-h-[120px] text-gray-700 rounded-xl border border-gray-200 px-3 py-2">
                  {<EditorWrapper editor={editor} />}
                </div>
                {/* <ReactQuill
                  formats={formats}
                  modules={modules}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder={placeholder || "Start typing..."}
                  className="text-gray-700 rounded-xl"
                /> */}
                {/* <Input.TextArea
                  rows={4}
                  placeholder="e.g chapter description"
                /> */}
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
    </div>
  );
};

export default Modules;
