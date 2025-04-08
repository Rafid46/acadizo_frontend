/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import useAxios from "../../hooks/useAxios";
import useCurrentUser from "../../hooks/useCurrentUser";
import Toast from "../../common/Toast";

const CreateAcademyModal = ({
  createUserModal,
  setCreateUserModal,
  loading,
}: any) => {
  const { data: currentUser }: any = useCurrentUser();
  const axiosPublic = useAxios();
  const handleCreateAcademy = async (values: any) => {
    const userEmail = currentUser?.email;
    try {
      console.log("form values", values);
      const res = await axiosPublic.post("/academy/createAcademy", {
        academyName: values?.academy_name,
        academyDescription: values?.academy_description,
        academyNumber: values?.academy_number,
        academyCreatedBy: userEmail,
      });
      const showNotification = Toast({
        type: "success",
        message: "Success",
        description: "Academy created successfully,",
      });
      showNotification();
      console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      const showNotification = Toast({
        type: "warning",
        message: "Failed",
        description: errorMessage,
      });
      showNotification();
    }
  };
  return (
    <div>
      <Modal
        footer={null}
        title="Create your own academy"
        centered
        open={createUserModal}
        onOk={() => setCreateUserModal(false)}
        onCancel={() => setCreateUserModal(false)}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={handleCreateAcademy}
          className="mt-8 grid grid-cols-6 gap-2"
        >
          <style>
            {` 
                  .ant-form-item-label {
                    padding: 5px 0 !important;
                  }

                  .ant-form-item .ant-form-item-explain-error {
                    font-size: 12px !important;
                    margin-top: 2px !important;
                  }

                  .custom_hover:hover {
                    background-color: #35915a !important;
                  
                  }
                  `}
          </style>
          <div className="col-span-6">
            <Form.Item
              name="academy_name"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Academy name
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "please input academy name",
                },
              ]}
            >
              <Input
                type="text"
                className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color mt-0"
              />
            </Form.Item>
            <p className="text-[#6B7280] text-[11.2px] -mt-1">
              This is your public academy name
            </p>
          </div>

          <div className="col-span-6">
            <Form.Item
              name="academy_description"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Description
                </p>
              }
            >
              <TextArea className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color" />
            </Form.Item>
            <p className="text-[#6B7280] text-[11.2px] -mt-1">
              This is your description of your academy
            </p>
          </div>

          <div className="col-span-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "please input your number of academy members",
                },
              ]}
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Number of member
                </p>
              }
              name="academy_number"
            >
              <Input
                type="number"
                className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color mt-0"
              />
            </Form.Item>
            <p className="text-[#6B7280] text-[11.2px] -mt-6">
              This is the total number of member of your academy. You may change
              it later
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center justify-end sm:gap-4 mt-5">
            <Button
              loading={loading}
              disabled={loading}
              htmlType="submit"
              style={{
                transition: "background-color 0.3s ease",
              }}
              type="primary"
              className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white bg-secondary-color custom_hover`}
            >
              {loading ? "Creating" : "Create"}
            </Button>
          </div>
        </Form>
        {/* <Form
          onFieldsChange={onFieldsChange}
          requiredMark={false}
          layout="vertical"
          onFinish={handleRegister}
          className="mt-8 grid grid-cols-6 gap-2"
        >
          <div className="col-span-6 sm:col-span-3">
            <style>
              {` 
                  .ant-form-item-label {
                    padding: 5px 0 !important;
                  }

                  .ant-form-item .ant-form-item-explain-error {
                    font-size: 12px !important;
                    margin-top: 2px !important;
                  }

                  .custom_hover:hover {
                    background-color: #35915a !important;
                  
                  }
                  `}
            </style>

            <Form.Item
              name="first_name"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  First Name
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "please input your first name",
                },
              ]}
            >
              <Input
                type="text"
                className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color mt-0"
              />
            </Form.Item>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Form.Item
              name="last_name"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Last Name
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "please input your last name",
                },
              ]}
            >
              <Input
                type="text"
                className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              />
            </Form.Item>
          </div>

          <div className="col-span-6">
            <Form.Item
              name="email"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">Email</p>
              }
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "please input your email",
                },
              ]}
            >
              <Input
                type="email"
                className="h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              />
            </Form.Item>
          </div>

          <div className="col-span-6">
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">Role</p>
              }
              name="role"
            >
              <Select
                // defaultValue={user?.gender || undefined}
                className="shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              >
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Form.Item
              name="password"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Password
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "please input your password",
                },
                {
                  validator: (_, value) => {
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one capital letter"
                        )
                      );
                    }
                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Password must contain at least one small letter"
                        )
                      );
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "  Password must contain at least one special character"
                        )
                      );
                    }
                    if (value.length < 6) {
                      return Promise.reject(
                        new Error(
                          "This_password_is_too_short._It_must_contain_at_least_8_characters."
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                name="password"
                className="h-[36px] w-full rounded-md focus:border-primary-color  text-sm text-gray-700 !bg-white"
              />
            </Form.Item>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              className="mb-4"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Confirm password
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "The password confirmation must match the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two password you entered doesn't match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="h-[36px] w-full rounded-md focus:border-primary-color outline-none text-sm text-gray-700" />
            </Form.Item>
          </div>
          <div className="col-span-6 sm:flex sm:items-center justify-end sm:gap-4">
            <Button
              disabled={isButtonDisabled || loading}
              htmlType="submit"
              style={{
                transition: "background-color 0.3s ease",
              }}
              type="primary"
              className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white bg-secondary-color custom_hover 
`}
            >
              Create an account
            </Button>
          </div>
        </Form> */}
      </Modal>
    </div>
  );
};

export default CreateAcademyModal;
