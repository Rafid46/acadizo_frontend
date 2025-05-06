/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  ColorPicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaRegFileAlt } from "react-icons/fa";
import { RiUploadCloudLine } from "react-icons/ri";
// import ReactQuill from "react-quill";
import useAxios from "../hooks/useAxios";
import Toast from "../common/Toast";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import EditButtons from "./EditButtons";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
const EditModuleDrawer = ({ value, open, setOpen, module }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>(value || "");
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const editorRef = useRef<any>(null);
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

  const onClose = () => {
    setOpen(false);
  };
  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (module) {
      form.setFieldsValue({
        heading: module?.heading,
        title: module?.title,
        color: module?.color,
      });
      setContent(module?.description || "");
    }
  }, [module, form]);

  // update module method

  const { mutate: updateModule, isLoading: isUpdateLoading }: any = useMutation(
    {
      mutationKey: ["updateModule"],
      mutationFn: async ({ moduleId, moduleData }: any) => {
        return await axiosPublic.patch(
          `/modules/update-module/${moduleId}`,
          moduleData
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allModules"] });
        const showNotification = Toast({
          type: "success",
          message: "module updated successfully",
          description: "",
        });
        showNotification();
        form.resetFields();
        setSelectedFile(null);
        onClose();
      },

      onError: (error: any) => {
        console.error("Error updating module", error);
        const showNotification = Toast({
          type: "success",
          message: "module updated successfully",
          description: "",
        });
        showNotification();
      },
    }
  );

  const onFinish = (values: any) => {
    const { title, heading, color } = values;
    // const currentUserEmail = currentUser?.email;
    // const joinedAcademyDetails = academyLists?.find((item: any) =>
    //   item?.academyMembers?.some(
    //     (member: any) => member?.email === currentUserEmail
    //   )
    // );
    // const academyId = joinedAcademyDetails?.academyId;
    // const academyName = joinedAcademyDetails?.academyName;
    const description = editorRef.current?.getHTML() || "";
    const moduleFormdata = new FormData();
    moduleFormdata.append("title", title);
    moduleFormdata.append("heading", heading);
    moduleFormdata.append("description", description);
    moduleFormdata.append("color", color);
    if (selectedFile) {
      moduleFormdata.append("file", selectedFile);
    }
    updateModule({
      moduleId: module?.moduleId,
      moduleData: moduleFormdata,
    });
  };

  const editor = useEditor({
    extensions: [
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
    content: module?.description || "",
    onCreate: ({ editor }) => {
      editorRef.current = editor;
    },
    onUpdate: () => {
      // No state updates here to prevent re-renders
    },
  });

  useEffect(() => {
    if (open && module) {
      form.setFieldsValue({
        heading: module.heading,
        title: module.title,
        color: module.color,
      });
      editor?.commands.setContent(module.description || "");
    }
  }, [open, module]);

  return (
    <div>
      <Drawer
        title="Edit module"
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
              loading={isUpdateLoading}
              htmlType="submit"
            >
              {isUpdateLoading ? "processing..." : "Update"}
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
                label={
                  <p className="text-sm font-semibold text-gray-500">
                    Description
                  </p>
                }
                initialValue={content}
                className=""
              >
                {editor && <EditButtons editor={editor} />}
                {editor && (
                  <EditorContent
                    editor={editor}
                    className="bg-gray-200 rounded-xl p-4 w-full max-w-full overflow-x-auto"
                  />
                )}
                {/* <ReactQuill
                  formats={formats}
                  modules={modules}
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  placeholder={placeholder || "Start typing..."}
                  className="text-gray-700 rounded-xl"
                /> */}
                {/* <Input.TextArea
                  rows={4}
                  placeholder="e.g chapter description"
                /> */}
              </Form.Item>
              {
                <p className="text-sm font-semibold text-gray-500">
                  Previous attachments
                </p>
              }
              <div className="mb-5">
                {module?.file && (
                  <a
                    href={`http://localhost:3000/file/${module?.file}`}
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
                              {module?.file?.length >= 15
                                ? `${module?.file?.substring(0, 15)}...`
                                : module?.file}
                            </p>
                            <p className="text-gray-500">Attachment</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(module?.file)}
                          className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                        >
                          <BiDownload />
                        </button>
                      </div>
                    </div>
                  </a>
                )}
              </div>
              <Form.Item
                label={
                  <p className="text-sm font-semibold text-gray-500">
                    Update attachment
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

export default EditModuleDrawer;
