/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, notification, Form, Input, Select, List } from "antd";
import { useContext, useEffect, useState } from "react";
import { CiCalendar, CiMapPin, CiStar } from "react-icons/ci";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "../hooks/useAxios";
import useUser from "../hooks/useUser";
import TextArea from "antd/es/input/TextArea";
import { PiStudent } from "react-icons/pi";
const InstitutionSection = () => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [academyList, setAcademyList] = useState<any[]>([]);
  const [searchItem, setSearchItem] = useState(" ");
  const axiosPublic = useAxios();
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { users }: any = useUser();
  console.log(users, "new usersss");
  // const { Option } = Select;
  const {
    createUser,
    updateUserProfile,
    // googleSignIn,
    loading,
    setLoading,
    logOut,
    user,
  }: any = useContext(AuthContext);

  // const currentUser = users?.find(
  //   (item: { email: string; id: string }) => item.email === user?.email
  // )?.email;
  //   console.log("current user -->", currentUser);
  const currentUserId = users?.find(
    (item: { email: string; id: string }) => item.email === user?.email
  )?.id;

  console.log("current user id -->", currentUserId);

  // const matchUser = (email: any) => {
  //   const user = users.find((user: any) => user?.email === email);
  //   return user;
  // };

  // const handleRegister = async (values: any) => {
  //   const { email, password, first_name, last_name } = values;
  //   await updateUserProfile(`${first_name} ${last_name}`);
  //   console.log("Registering with values:", values);

  //   createUser(email, password)
  //     .then((res: any) => {
  //       console.log("User created in Firebase:", res.data);

  //       const loggedInUser = res.user; // Firebase user data

  //       console.log("Logged in user:", loggedInUser);
  //       const userData = {
  //         ...values,
  //         role: "teacher",
  //         firstName: values.first_name,
  //         lastName: values.last_name,
  //       };

  //       console.log("User data being sent to the backend:", userData);
  //       return axiosPublic.post("/api/v1/user/create-user", userData);
  //     })
  //     .then((response: any) => {
  //       notification.success({
  //         message: "Registration success",
  //         description: "Account registered successfully",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       console.log("User data saved to MongoDB:", response.data);
  //     })
  //     .catch((error: any) => {
  //       notification.error({
  //         message: "Something went wrong",
  //         description: "registration failed",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       console.log("Error during registration:", error);
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
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // };
  // const handleRegister = async (values: any) => {
  //   try {
  //     const { email, password, first_name, last_name, role } = values;
  //     const name = `${first_name} ${last_name}`;

  //     // Check if user already exists in your backend
  //     // const users = await axiosPublic.get("/api/v1/users");
  //     // const matchUser = users.data.find((user: any) => user.email === email);
  //     // if (matchUser) {
  //     //   notification.error({
  //     //     message: "Email already exists",
  //     //     description:
  //     //       "The provided email is already registered. Please use another email.",
  //     //     duration: 3,
  //     //     placement: "topRight",
  //     //   });
  //     //   return;
  //     // }

  //     // Temporarily change Firebase Auth persistence to "none" for this operation
  //     await setPersistence(auth, browserLocalPersistence);

  //     // Create user in Firebase (does not persist session)
  //     const userCredential = await createUser(email, password);
  //     console.log("User created in Firebase:", userCredential.user);
  //     await logOut();
  //     // Prepare user data for MongoDB
  //     const userData = {
  //       first_name,
  //       last_name,
  //       email,
  //       role,
  //       displayName: name,
  //     };

  //     // Save user data to MongoDB
  //     const res = await axiosPublic.post("/api/v1/user/create-user", userData);
  //     console.log("User data saved to MongoDB:", res.data);

  //     // Notify user of success
  //     notification.success({
  //       message: "Registration success",
  //       description: "Account registered successfully. Please log in.",
  //       duration: 3,
  //       placement: "topRight",
  //     });

  //     // Optionally redirect the user to the login page
  //     // history.push('/login');
  //   } catch (error: any) {
  //     notification.error({
  //       message: "Registration failed",
  //       description: error.message || "An error occurred during registration",
  //       duration: 3,
  //       placement: "topRight",
  //     });
  //     console.error("Error during");
  //   }
  // };
  // const handleGoogleSignIn = () => {
  //   googleSignIn().then((result: any) => {
  //     console.log(result.user);

  //     const [firstName, ...rest] = result.user.displayName.split(" ");
  //     const lastName = rest.join(" ");

  //     const userInfo = {
  //       email: result.user?.email,
  //       firstName: firstName || "Unknown", // Default to avoid empty fields
  //       lastName: lastName || " ",
  //       role: "teacher",
  //     };

  //     axiosPublic
  //       .post("http://localhost:3000/api/v1/user/create-user", userInfo)
  //       .then((res: any) => {
  //         console.log(res.data);
  //       })
  //       .catch((error: any) => {
  //         console.error("Error saving user data:", error);
  //       });
  //   });
  // };

  // const onFieldsChange = (_: any, allFields: any) => {
  //   const isValid = allFields.every(
  //     (field: any) => field.errors.length === 0 && field.value
  //   );
  //   setIsButtonDisabled(!isValid);
  // };

  const handleCreateAcademy = async (values: any) => {
    try {
      console.log("form values", values);
      const res = await axiosPublic.post(
        "http://localhost:3000/academy/createAcademy",
        {
          academyName: values?.academy_name,
          academyDescription: values?.academy_description,
          academyNumber: values?.academy_number,
        }
      );
      notification.success({
        message: <p className="font-semibold text-[14px]">Success</p>,
        description: (
          <p className="text-[12px] text-gray-600">
            Academy created successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
      console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
      notification.error({
        message: <p className="font-semibold text-[14px]">Oops</p>,
        description: (
          <p className="text-[12px] text-gray-600">Something went wrong</p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  // join academy

  useEffect(() => {
    const getAcademyList = async () => {
      try {
        const res = await axiosPublic.get(
          "http://localhost:3000/academy/academyList"
        );
        console.log("academy list", res.data.data);
        setAcademyList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAcademyList();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const handleJoinAcademy = async (academyName: string) => {
    try {
      const userId = currentUserId;
      const res = await axiosPublic.post(
        "http://localhost:3000/api/v1/user/join-academy",
        {
          userId,
          academyName,
        }
      );
      console.log(res.data);
      notification.success({
        message: <p className="font-semibold text-[14px]">Joined</p>,
        description: (
          <p className="text-[12px] text-gray-600">
            Joined academy successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
    } catch (error) {
      notification.error({
        message: <p className="font-semibold text-[14px]"></p>,
        description: (
          <p className="text-[12px] text-gray-600">Something went wrong</p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
      console.log(error);
    }
  };
  return (
    <section>
      <div className="max-w-full mx-auto">
        <div className="rounded-lg overflow-hidden ">
          {/* Banner with gradient */}
          <div className="h-32 bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-500" />

          <div className="px-6 pb-6">
            {/* Profile section */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Profile image */}
                <div className="relative -mt-16 mb-4">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="rounded-full border-4 border-white w-32 h-32 object-cover"
                  />
                </div>
                <div className="flex lg:flex-row flex-col items-center justify-between">
                  {/* Profile info */}
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Institute name</h1>
                    <p className="text-gray-600 mb-2">
                      Engineer at BB Agency Industry
                    </p>
                  </div>
                  {/* Stats */}
                  {/* Action buttons */}
                  <div className="flex-col">
                    <div className="flex items-center gap-2 pt-4">
                      <Button className="rounded-full bg-gray-100 hover:bg-gray-200">
                        Message
                      </Button>
                      <Button className="rounded-full">Book a session</Button>
                      <Button ghost>
                        <FiMoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <div className="bg-[#EEF2FE] rounded-2xl p-6">
                        <div className="text-2xl font-bold text-purple-600">
                          351
                        </div>
                        <div className="text-gray-600 text-sm mt-5 font-semibold">
                          Completed Sessions
                        </div>
                      </div>
                      <div className="bg-[#F0F9FF] rounded-2xl p-6 ">
                        <div className="text-2xl font-bold text-purple-600">
                          2+
                        </div>
                        <div className="text-gray-600 text-sm mt-5 font-semibold">
                          Years Experiences
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Location and join date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-5 lg:mt-0">
                  <div className="flex items-center gap-1">
                    <CiMapPin className="w-4 h-4" />
                    <span>San francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiCalendar className="w-4 h-4" />
                    <span>Joined April 2021</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0(12)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* table */}
      <section>
        <div className="flex flex-col">
          <span className="flex items-center justify-between">
            <p className="font-semibold text-2xl text-[#030712] my-5">
              All students and teachers
            </p>
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() => setCreateUserModal(true)}
                icon={<PiStudent />}
                // disabled={isButtonDisabled || loading}
                // loading={loading}
                htmlType="submit"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                type="primary"
                className={`text-sm font-semibold h-[40px] px-8 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-gray-200`}
              >
                Join
              </Button>
              <Button
                onClick={() => setCreateUserModal(true)}
                icon={<FaPlus />}
                // disabled={isButtonDisabled || loading}
                // loading={loading}
                htmlType="submit"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                type="primary"
                className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white bg-secondary-color custom_hover`}
              >
                Create your academy
              </Button>
            </div>
            {/* academy input list
            <div>
              <Input
                placeholder="Search academy by name"
                value={searchItem}
                onChange={handleSearch}
                style={{ marginBottom: 20, width: "300px" }}
              />
              <List
                loading={loading}
                dataSource={academyList.filter((academy) =>
                  academy.academyName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                )}
                renderItem={(academy) => (
                  <List.Item
                    actions={[
                      <Button
                        onClick={() => handleJoinAcademy(academy?.academyName)}
                        type="primary"
                      >
                        Join Academy
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={academy.academyName}
                      description={academy.academyDescription}
                    />
                  </List.Item>
                )}
              />
            </div> */}
          </span>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg border-gray-300">
                <table className="table-auto min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      <th>
                        <div className="flex items-center py-5 px-5">
                          <input
                            type="checkbox"
                            value=""
                            className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                          />
                        </div>
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Company
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        User ID
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]">
                        Full Name &amp; Email
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Type
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Industry Type
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Join Date
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Budget
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Country
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Status
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td>
                        <div className="flex items-center py-5 px-5">
                          <input
                            type="checkbox"
                            value=""
                            className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                          />
                        </div>
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Louis Vuitton
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        20010510
                      </td>
                      <td className="px-5 py-3">
                        <div className="w-48 flex items-center gap-3">
                          <img
                            src="https://pagedone.io/asset/uploads/1697536419.png"
                            alt="Floyd"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="data">
                            <p className="font-normal text-sm text-gray-900">
                              Floyd Miles
                            </p>
                            <p className="font-normal text-xs leading-5 text-gray-400">
                              floydmiles@pagedone.io
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Customer
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Accessories
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Jun. 24, 2023
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        $18,500
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        United States
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                          <span className="font-medium text-xs text-emerald-600">
                            Active
                          </span>
                        </div>
                      </td>
                      <td className="flex p-5 items-center gap-0.5">
                        <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex items-center">
                          <FaEdit className="text-gray-500 group-hover:text-white" />
                        </button>
                        <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center">
                          <FaTrashAlt className="text-gray-500 group-hover:text-white" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Form
            requiredMark={false}
            layout="vertical"
            // onFinish={handleJoin}
          >
            <Form.Item
              name="first_name"
              className="mb-2"
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Academy name
                </p>
              }
              rules={[
                {
                  required: true,
                  message: "please input the academy name",
                },
              ]}
            >
              <Input
                type="text"
                className="h-[36px] w-[350px] rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color mt-0"
              />
            </Form.Item>
            <Button
              // disabled={isButtonDisabled || loading}
              htmlType="submit"
              style={{
                transition: "background-color 0.3s ease",
              }}
              type="primary"
              className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white bg-secondary-color custom_hover 
`}
            >
              Join
            </Button>
          </Form>
        </div>
      </section>
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
              // rules={[
              //   {
              //     required: true,
              //     message: "please input academy name",
              //   },
              // ]}
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

          {/* <div className="col-span-6 sm:col-span-3">
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
          </div> */}

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
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Number of academy member
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
              // disabled={isButtonDisabled || loading}
              htmlType="submit"
              style={{
                transition: "background-color 0.3s ease",
              }}
              type="primary"
              className={`text-sm font-semibold h-[40px] px-8 border-none shadow-none text-white bg-secondary-color custom_hover`}
            >
              Create
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
    </section>
  );
};

export default InstitutionSection;
