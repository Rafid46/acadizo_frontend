/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, notification } from "antd";
import { useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import icon from "../../assets/icons/acadizo_logo.png";
import banner from "../../assets/images/login_pattern.jpg";
import { AuthContext } from "../../providers/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../../common/Toast";
const Login = () => {
  const axiosPublic = useAxios();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { signIn, googleSignIn, loading, setLoading }: any =
    useContext(AuthContext);

  const handleLogin = (values: any) => {
    setLoading(true);
    const email = values.email;
    const password = values.password;
    signIn(email, password)
      .then(() => {
        notification.success({
          message: "Login Success",
          description: "Logged in successfully.",
          duration: 3,
          placement: "topRight",
        });

        navigate(from, { replace: true });
        navigate("/dashboard");
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: "Login failed",
          description: "Please try again or check your email and password",
          duration: 3,
          placement: "topRight",
        });
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
    const isValid = allFields?.every(
      (field: any) => field?.errors?.length === 0 && field?.value
    );
    setIsButtonDisabled(!isValid);
  };
  return (
    <div>
      <section className="bg-white rounded-xl">
        <style>
          {` 
                  .ant-form-item .ant-form-item-explain-error {
                    font-size: 12px !important;
                    margin-top: 2px !important;
                  }

                  .custom_hover:hover {
                    background-color: #35915a !important;
                  
                  }
                  `}
        </style>
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 rounded-xl p-2">
          <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6 rounded-xl">
            <img
              alt=""
              src={banner}
              className="absolute inset-0 h-full w-full object-cover rounded-r-xl  rounded-l-xl  lg:rounded-l-xl lg:rounded-r-none"
            />
          </aside>

          <main className="h-[80vh] sm:h-auto flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-8 xl:col-span-6 lg:px-16 lg:py-12  bg-[#f5f5f5] rounded-l-xl rounded-r-xl lg:rounded-r-xl lg:rounded-l-none">
            <div className="lg:w-4/6 w-full">
              <div className="top-0 absolute right-0 mr-6 mt-6 cursor-pointer">
                {/* <p className="flex items-center gap-x-2">
                  <BsArrowLeftCircle className="text-3xl z-10" />
                  <p className="text-base font-semibold">Home</p>
                </p> */}
                <a href="/">
                  <div className="flex bg-white w-fit px-1.25 py-1.25 shadow-box-up rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out cursor-pointer">
                    <div className="dark:shadow-buttons-box-dark rounded-2xl w-full px-1.5 py-1.5 md:px-3 md:py-3">
                      <a
                        title="Go to about me page"
                        className="text-light-blue-light hover:text-black dark:text-gray-400 border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0"
                      >
                        <AiFillHome />
                      </a>
                    </div>
                  </div>
                </a>
              </div>
              <img className="w-32" src={icon} alt="" />
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl">
                Login to your{" "}
                <span className="text-primary-color">Account</span>
              </h1>

              <Form
                onFieldsChange={onFieldsChange}
                onFinish={handleLogin}
                className="mt-8 grid grid-cols-6 gap-4"
              >
                <div className="col-span-8">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <Form.Item
                    name="email"
                    className="mb-2"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "please enter your email",
                      },
                    ]}
                  >
                    <Input
                      type="email"
                      id="Email"
                      name="email"
                      className="mt-1 h-[36px] w-full rounded-md bg-white text-sm text-gray-700 focus:border-primary-color"
                    />
                  </Form.Item>
                </div>

                <div className="col-span-8">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    Password{" "}
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "please enter your password",
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
                      className="mt-1 h-[36px] w-full rounded-md focus:border-primary-color outline-none text-sm text-gray-700"
                    />
                  </Form.Item>
                </div>

                <div className="col-span-8 flex-col justify-start -mt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Don't have an account?
                      <a
                        href="/register"
                        className="text-primary-color underline ml-2"
                      >
                        Sign up
                      </a>
                    </p>
                    {/* <a
                      href="/register"
                      className="text-primary-color font-semibold ml-2"
                    >
                      Forget Password
                    </a> */}
                  </div>
                  <div className="mt-4">
                    <Button
                      disabled={isButtonDisabled || loading}
                      loading={loading}
                      htmlType="submit"
                      style={{
                        transition: "background-color 0.3s ease",
                      }}
                      type="primary"
                      className={`w-full text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white 
    ${
      isButtonDisabled
        ? "bg-gray-200 cursor-not-allowed"
        : "bg-secondary-color custom_hover"
    }`}
                    >
                      {loading ? "Logging in" : "Login"}
                    </Button>
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
                        <title>Google-color</title>{" "}
                        <desc>Created with Sketch.</desc> <defs> </defs>{" "}
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
                      <span>Continue with Google</span>
                    </Button>
                  </div>
                </div>
              </Form>
              <div className="text-[12px] font-semibold text-gray-500 text-center mt-2">
                email: test@test.com (teacher) <br />
                pass: Admin123#
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
