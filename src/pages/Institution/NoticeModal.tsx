/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import useAxios from "../../hooks/useAxios";
import useCurrentAcademy from "../../hooks/useCurrentAcademy";
import useAcademies from "../../hooks/useAcademies";
import useCurrentUser from "../../hooks/useCurrentUser";
import Toast from "../../common/Toast";
import useNotice from "../../hooks/useNotice";

const NoticeModal = ({ noticeModal, setNoticeModal }: any) => {
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
    const noticeData = {
      title,
      description,
      academyId,
      academyName,
    };

    postNotice(noticeData);
  };
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

          <div className="text-end">
            <Button
              onClick={() => setNoticeModal(false)}
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
