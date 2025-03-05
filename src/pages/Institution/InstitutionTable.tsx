/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, MenuProps } from "antd";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import Loader from "../../common/Loader";
import moment from "moment";
import useAllUser from "../../hooks/useAllUser";
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { CiBellOn, CiMenuKebab } from "react-icons/ci";
import NoticeModal from "./NoticeModal";

const InstitutionTable = ({
  setAcademyModal,
  setCreateUserModal,
  loading,
  members,
}: any) => {
  const [noticeModal, setNoticeModal] = useState(false);
  const { data: currentUser }: any = useCurrentUser();
  // useEffect(() => {
  //   if (allUsers) {
  //     const memberDetail = allUsers?.find(
  //       (member: any) => member?.email === allUsers?.email
  //     );
  //     if (memberDetail) {
  //       setMemberDetails((prev: any) => [...prev]);
  //     }
  //   }
  // }, [allUsers]);
  // console.log(memberDetails, "member details");

  const memberDetail = () => {
    const emails = members[0]?.academyMembers?.map((item: any) => item?.email);
    console.log(emails, "member details");
    return emails;
  };

  memberDetail();

  const dropItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Update notice",
      onClick: () => setNoticeModal(true),
    },
  ];

  return (
    <div>
      {/* table */}
      <section>
        <div className="flex flex-col">
          <span className="flex items-center justify-between">
            <p className="font-semibold text-2xl text-[#030712] my-5">
              All students and teachers
            </p>
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() => setAcademyModal(true)}
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
                Join academy
              </Button>
              {currentUser?.role === "teacher" && (
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
              )}

              <Dropdown menu={{ items: dropItems }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Button
                    // onClick={() => setNoticeModal(true)}
                    icon={<CiMenuKebab className="text-2xl" />}
                    // disabled={isButtonDisabled || loading}
                    // loading={loading}
                    // htmlType="submit"
                    style={{
                      transition: "background-color 0.3s ease",
                    }}
                    className={`cursor-pointer`}
                  ></Button>
                </a>
              </Dropdown>
              <NoticeModal
                setNoticeModal={setNoticeModal}
                noticeModal={noticeModal}
              ></NoticeModal>
            </div>
            {/* academy input list */}
          </span>
          <section className="">
            <div className="">
              {/* <p className="font-semibold text-2xl text-[#030712] mb-5">
                All users
              </p> */}
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
                          {members[0]?.academyMembers?.map((user: any) => (
                            <tr
                              key={user?.id}
                              // onClick={() => {
                              //   handleUserDetails(user?.id);
                              //   setModal1Open(true);
                              // }}
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
                                    {user?.role === "student"
                                      ? "Student"
                                      : "Teacher"}
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
          </section>
        </div>
        {/* <div>
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
        </div> */}
      </section>
    </div>
  );
};

export default InstitutionTable;
