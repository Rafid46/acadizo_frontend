/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Upload } from "antd";
import useAxios from "../../hooks/useAxios";
import useCurrentAcademy from "../../hooks/useCurrentAcademy";
import useAcademies from "../../hooks/useAcademies";
import useCurrentUser from "../../hooks/useCurrentUser";
import Toast from "../../common/Toast";
import useNotice from "../../hooks/useNotice";
import { useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";

const NoticeModal = ({ noticeModal, setNoticeModal }: any) => {
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: currentAcademy }: any = useCurrentAcademy();
  const { data: academyLists }: any = useAcademies();
  const { data: currentUser }: any = useCurrentUser();
  console.log(currentAcademy, "currentacademy");
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const { refetch }: any = useNotice();

  const { mutate: postNotice, isLoading }: any = useMutation({
    mutationKey: ["postNotice"],
    mutationFn: async (noticeData) => {
      return await axiosPublic.post("/academy/notice", noticeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academyNotices"] });
      refetch();
      form.resetFields();
      setSelectedFile(null);
      const showNotification = Toast({
        type: "success",
        message: "",
        description: "Notice updated",
      });
      showNotification();
    },
    onError: (error) => {
      console.error("Error posting notice:", error);
    },
  });

  // const onFinish = (values: any) => {
  //   const { title, description } = values;
  //   const currentUserEmail = currentUser?.email;
  //   const joinedAcademyDetails = academyLists?.find((academy: any) =>
  //     academy?.academyMembers?.some(
  //       (member: any) => member?.email === currentUserEmail
  //     )
  //   );
  //   const academyId = joinedAcademyDetails?.academyId;
  //   const academyName = joinedAcademyDetails?.academyName;
  //   console.log(academyId, academyName, "academy info");
  //   // Include academyId and academyName in the request body
  //   const noticeData = {
  //     title,
  //     description,
  //     academyId,
  //     academyName,
  //     file: selectedFile,
  //   };

  //   postNotice(noticeData);
  // };
  const onFinish = (values: any) => {
    const { title, description } = values;
    const currentUserEmail = currentUser?.email;
    const joinedAcademyDetails = academyLists?.find((academy: any) =>
      academy?.academyMembers?.some(
        (member: any) => member?.email === currentUserEmail
      )
    );
    const academyId = joinedAcademyDetails?.academyId;
    const academyName = joinedAcademyDetails?.academyName;
    console.log(academyId, academyName, "academy info");
    // Include academyId and academyName in the request body

    const noticeFormData = new FormData();
    noticeFormData.append("title", title);
    noticeFormData.append("description", description);
    noticeFormData.append("academyId", academyId);
    noticeFormData.append("academyName", academyName);
    if (selectedFile) noticeFormData.append("file", selectedFile);

    postNotice(noticeFormData);
    setNoticeModal(false);
  };

  // const handleFileUpload = (e: any) => {
  //   setSelectedFile(e.target.files[0]);
  // };
  const handleFileChange = ({ file }: any) => {
    setSelectedFile(file.originFileObj);
  };

  console.log(selectedFile);
  return (
    <div>
      <Modal
        footer={null}
        title="Update notice"
        centered
        open={noticeModal}
        onOk={() => setNoticeModal(false)}
        onCancel={() => setNoticeModal(false)}
      >
        <Form
          form={form}
          encType="multipart/form-data"
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            label={
              <p className="block text-sm font-medium text-gray-700">Title</p>
            }
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input
              type="text"
              className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color mt-0"
            />
          </Form.Item>

          <Form.Item
            label={
              <p className="block text-sm font-medium text-gray-700">
                Description
              </p>
            }
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea
              className="placeholder:text-sm"
              rows={4}
              placeholder="Enter the notice description"
            />
          </Form.Item>
          {/* <Form.Item>
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            >
              <FaUpload /> Upload File
            </label>
            <input
              id="fileUpload"
              type="file"
              className="!hidden"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">{selectedFile?.name}</p>
            )}
          </Form.Item> */}
          <Form.Item>
            <Dragger
              name="file"
              beforeUpload={() => false}
              multiple={false}
              onChange={({ fileList }) => {
                const singleFile = fileList[0]?.originFileObj;
                setSelectedFile(singleFile || null);
              }}
              fileList={selectedFile ? [{ name: selectedFile?.name }] : null}
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

          <div className="text-end">
            <Button
              // onClick={() => setNoticeModal(false)}
              className="custom_button_style"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {isLoading ? "Posting..." : "Post Notice"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NoticeModal;
