/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Form, Input, notification, Select } from "antd";
import banner from "../../assets/images/pattern.jpg";
import icon from "../../assets/icons/acadizo_logo.png";
import useAxios from "../../hooks/useAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
// import useUser from "../../hooks/useUser";
import useAllUser from "../../hooks/useAllUser";
import { useNavigate } from "react-router-dom";
import Toast from "../../common/Toast";
const Register = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { users }: any = useAllUser();
  const {
    createUser,
    updateUserProfile,
    googleSignIn,
    loading,
    setLoading,
  }: any = useContext(AuthContext);

  // const matchUser = (email: any) => {
  //   const user = users.find((user: any) => user?.email === email);
  //   return user;
  // };

  // const handleRegister = async (values: any) => {
  //   const { email, password, first_name, last_name } = values;
  //   await updateUserProfile(`${first_name} ${last_name}`);
  //   // console.log("Registering with values:", values);

  //   createUser(email, password)
  //     .then((res: any) => {
  //       // console.log("User created in Firebase:", res.data);

  //       const loggedInUser = res.user; // Firebase user data

  //       // console.log("Logged in user:", loggedInUser);
  //       const userData = {
  //         ...values,
  //         role: "teacher",
  //         firstName: values.first_name,
  //         lastName: values.last_name,
  //       };

  //       // console.log("User data being sent to the backend:", userData);
  //       return axiosPublic.post("/api/v1/user/create-user", userData);
  //     })
  //     .then((response: any) => {
  //       notification.success({
  //         message: "Registration success",
  //         description: "Account registered successfully",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       // console.log("User data saved to MongoDB:", response.data);
  //     })
  //     .catch((error: any) => {
  //       notification.error({
  //         message: "Something went wrong",
  //         description: "registration failed",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       // console.log("Error during registration:", error);
  //     });
  //   // const userdata = {
  //   //   ...values,
  //   //   role: "student",
  //   //   firstName: values.first_name,
  //   //   lastName: values.last_name,
  //   // };
  //   // axiosPublic
  //   //   .post("api/v1/user/create-user", userdata)
  //   //   .then((res) => {
  //   //     // console.log(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     // console.log(error);
  //   //   });
  // };
  const handleRegister = async (values: any) => {
    setLoading(true);
    const { email, password } = values;
    // console.log("Registering with values:", values);
    const name = `${values.first_name} ${values.last_name}`;
    const matchUser = users?.find((user: any) => user?.email === values?.email);
    if (matchUser) {
      notification.error({
        message: (
          <p className="font-semibold text-[14px]">Email already exists</p>
        ),
        description: (
          <p className="text-[12px] text-gray-600">
            The provided email is already registered. Please use another email
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });

      setLoading(false);
      // console.log("email already exist");
      return;
    }
    createUser(email, password)
      .then(() => {
        updateUserProfile(name).then(() => {
          // console.log("User created in Firebase:", res.data);

          // const loggedInUser = res.user; // Firebase user data

          // console.log("Logged in user:", loggedInUser);
          const userData = {
            ...values,
            role: values?.role,
            firstName: values?.first_name,
            lastName: values?.last_name,
          };

          // console.log("User data being sent to the backend:", userData);

          return axiosPublic
            .post("/api/v1/user/create-user", userData)
            .then(() => {
              navigate("/dashboard");
              notification.success({
                message: "Registration success",
                description: "Account registered successfully",
                duration: 3,
                placement: "topRight",
              });
              // console.log("User data saved to MongoDB:", res.data);
            });
        });
        setLoading(false);
      })
      .catch((error: any) => {
        notification.error({
          message: "Something went wrong",
          description: "registration failed",
          duration: 3,
          placement: "topRight",
        });
        console.log("Error during registration:", error);
        setLoading(false);
      });
  };

  // google sign in
  const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignIn()
      .then(async (result: any) => {
        const user = result?.user;
        if (!user) {
          notification.error({
            message: "Google Sign-In Failed",
            description: "No user info received",
          });
          setLoading(false);
          return;
        }

        const displayName = user.displayName || "Unknown";
        const [firstName, ...rest] = displayName.split(" ");
        const lastName = rest.join(" ") || " ";
        const email = user.email;
        const role = " ";

        try {
          // Check if user already exists
          const existingUser = await axiosPublic.get(
            `/api/v1/user/${encodeURIComponent(email)}`
          );

          if (existingUser?.data) {
            const showNotification = Toast({
              type: "success",
              message: "Welcome Back!",
              description: `${firstName}`,
            });
            showNotification();
            navigate("/dashboard");
            return;
          }
        } catch (err: any) {
          // console.log("User not found, proceeding to create...");
        }

        // Create new user
        const userData = {
          email,
          firstName,
          lastName,
          password: "GoogleAuth@123",
          role,
        };

        try {
          await axiosPublic.post("/api/v1/user/create-user", userData);

          notification.success({
            message: "Welcome!",
            description: "Account created successfully.",
          });
          navigate("/dashboard");
        } catch (err: any) {
          console.error("❌ Failed to save Google user:", err.message);
          notification.error({
            message: "Create User Failed",
            description: err.response?.data?.message || "Try again later",
          });
        } finally {
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.error("❌ Google Sign-In Failed:", error.message);
        notification.error({
          message: "Google Sign-In Error",
          description: error.message || "Try again later",
        });
        setLoading(false);
      });
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const isValid = allFields.every(
      (field: any) => field.errors.length === 0 && field.value
    );
    setIsButtonDisabled(!isValid);
  };
  // const onChange = (value: string) => {
  //   // console.log(`selected ${value}`);
  // };

  // const onSearch = (value: string) => {
  //   // console.log("search:", value);
  // };
  return (
    <section className="bg-white rounded-xl">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 rounded-xl p-2 ">
        <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6 rounded-xl">
          <img
            alt=""
            src={banner}
            className="absolute inset-0 h-full w-full object-cover rounded-r-xl  rounded-l-xl  lg:rounded-l-xl lg:rounded-r-none"
          />
        </aside>
        <main
          style={{ maxHeight: "100vh", maxWidth: "100%" }}
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-[#FAF9F6] rounded-l-xl rounded-r-xl lg:rounded-r-xl lg:rounded-l-none overflow-hidden"
        >
          <div className="max-w-xl lg:max-w-xl">
            <img className="w-32" src={icon} alt="" />

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl">
              Welcome to <span className="text-primary-color">Acadizo</span>
            </h1>

            <p className="mt-2 leading-relaxed text-gray-500 text-sm">
              Uniting Education Through Simplicity, Empowering Students and
              Teachers for a Seamless Learning Experience.
            </p>

            <Form
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
                {/* <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label> */}
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
                    <p className="block text-sm font-medium text-gray-700">
                      Email
                    </p>
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
                  name="role"
                  className="mb-2"
                  label={
                    <p className="block text-sm font-medium text-gray-700">
                      Your role
                    </p>
                  }
                  rules={[
                    {
                      required: true,

                      message: "please set your role",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a role"
                    optionFilterProp="label"
                    options={[
                      {
                        value: "teacher",
                        label: "Teacher",
                      },
                      {
                        value: "student",
                        label: "Student",
                      },
                    ]}
                  />
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
                      message:
                        "The password confirmation must match the password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two password you entered doesn't match"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className="h-[36px] w-full rounded-md focus:border-primary-color outline-none text-sm text-gray-700" />
                </Form.Item>
              </div>

              {/* <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div> */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  disabled={isButtonDisabled || loading}
                  loading={loading}
                  htmlType="submit"
                  style={{
                    transition: "background-color 0.3s ease",
                  }}
                  type="primary"
                  className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white 
    ${
      isButtonDisabled
        ? "bg-gray-200 cursor-not-allowed"
        : "bg-secondary-color custom_hover"
    }`}
                >
                  {loading ? "Creating account" : "  Create an account"}
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a
                    href="/login"
                    className="text-primary-color underline ml-2"
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </Form>
            <div className="">
              <Divider className="!font-inter !text-gray-400 !font-medium">
                or
              </Divider>
              <Button
                onClick={handleGoogleSignIn}
                className="mt-2 hover:bg-transparent w-full  !hover:text-primary-color text-sm font-semibold h-[40px] px-8 border-none flex items-center bg-white border border-gray-300 rounded-lg  py-2   text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span className="block text-sm font-medium !text-gray-700">
                  Sign up with Google
                </span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
