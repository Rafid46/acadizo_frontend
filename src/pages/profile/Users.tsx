/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAllUser from "../../hooks/useAllUser";
import moment from "moment";
import { useState } from "react";
import { Modal } from "antd";
import Loader from "../../common/Loader";
const Users = () => {
  const { allUsers, loading } = useAllUser();
  // console.log(allUsers, "this is all users");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modal1Open, setModal1Open] = useState(false);
  // const { users }: any = useUser();
  // // console.log(users, "new users");
  const handleUserDetails = (id: string) => {
    // console.log(id);
    // Search for the user in AllUserInfo directly
    const userDetails = allUsers?.find((user: any) => user?.id === id);
    setSelectedUser(userDetails);
    // console.log(userDetails);
  };

  // console.log(selectedUser);

  //   const items: DescriptionsProps["items"] = [
  //     {
  //       key: "1",
  //       label: "UserName",
  //       children: "Zhou Maomao",
  //     },
  //     {
  //       key: "2",
  //       label: "Telephone",
  //       children: "1810000000",
  //     },
  //     {
  //       key: "3",
  //       label: "Live",
  //       children: "Hangzhou, Zhejiang",
  //     },
  //     {
  //       key: "4",
  //       label: "Remark",
  //       children: "empty",
  //     },
  //     {
  //       key: "5",
  //       label: "Address",
  //       children:
  //         "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  //     },
  //   ];
  return (
    <section className="">
      <div className="">
        <p className="font-semibold text-2xl text-[#030712] mb-5">All users</p>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg ">
              {loading ? (
                <Loader />
              ) : (
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
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Institution
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        User ID
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize min-w-[150px]">
                        Full Name &amp; Email
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Role
                      </th>
                      {/* <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Industry Type
                      </th> */}
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Join Date
                      </th>
                      {/* <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Budget
                      </th> */}
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Status
                      </th>
                      {/* <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Status
                      </th> */}
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {allUsers?.map((user: any) => (
                      <tr
                        key={user?.id}
                        onClick={() => {
                          handleUserDetails(user?.id);
                          setModal1Open(true);
                        }}
                        className="bg-white transition-all duration-500 hover:bg-gray-50 cursor-pointer"
                      >
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
                          Institution
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {user?.id}
                        </td>
                        <td className="px-5 py-3">
                          <div className="w-48 flex items-center gap-3">
                            <img
                              src={
                                user?.photoURL
                                  ? user?.photoURL
                                  : "https://github.com/shadcn.png"
                              }
                              alt="Floyd"
                              className="w-10 h-10 rounded-full object-center object-cover"
                            />
                            <div className="data">
                              <p className="font-normal text-sm text-gray-900">
                                {user?.firstName} {user?.lastName}
                              </p>
                              <p className="font-normal text-xs leading-5 text-gray-400">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <div
                            className={`${
                              user?.role === "student"
                                ? "bg-blue-50"
                                : "bg-emerald-50"
                            } py-1.5 px-2.5  rounded-full flex justify-center w-20 items-center gap-1`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                user?.role === "student"
                                  ? "bg-blue-600"
                                  : "bg-emerald-600"
                              }`}
                            ></div>
                            <span
                              className={`${
                                user?.role === "student"
                                  ? "text-blue-600"
                                  : "text-emerald-600"
                              } font-medium text-xs`}
                            >
                              {user?.role === "student" ? "Student" : "Teacher"}
                            </span>
                          </div>
                        </td>
                        {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Accessories
                      </td> */}
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {moment(user?.createdAt).format("MMMM D, YYYY")}
                        </td>
                        {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        $18,500
                      </td> */}
                        {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        United States
                      </td> */}
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
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        width="50%"
        title="User details"
        centered
        open={modal1Open}
        footer={null}
        //   onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg border mt-5">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center gap-x-2">
              <img
                src={
                  selectedUser?.photoURL
                    ? selectedUser?.photoURL
                    : "https://github.com/shadcn.png"
                }
                alt="Floyd"
                className="w-10 h-10 rounded-full object-center object-cover"
              />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </h3>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {selectedUser?.Email}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.firstName} {selectedUser?.lastName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.contactNo}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.gender}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.role}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Joined date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {moment(selectedUser?.createdAt).format("MMMM D, YYYY")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* <div className="text-end mt-5">
            <Button
              className="custom_hover ml-5 mr-2 text-sm font-semibold h-[40px] px-8 border-none shadow-none !bg-secondary-color !text-white"
              type="primary"
              onClick={() => setModal1Open(false)}
            >
              Ok
            </Button>
          </div> */}
      </Modal>
    </section>
  );
};

export default Users;
