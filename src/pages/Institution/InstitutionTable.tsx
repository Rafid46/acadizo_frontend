/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Menu, MenuProps, Popconfirm, Tooltip } from "antd";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import Loader from "../../common/Loader";
import moment from "moment";
import { useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { SlOptionsVertical } from "react-icons/sl";

import {
  ArrowDownUp,
  BookOpen,
  GraduationCap,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Toast from "../../common/Toast";
import NoticeModal from "./NoticeModal";
import useAllUser from "../../hooks/useAllUser";

const InstitutionTable = ({
  setAcademyModal,
  setCreateUserModal,
  loading,
  members,
}: any) => {
  const [noticeModal, setNoticeModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [filteredRoleMembers, setFilteredRoleMembers] = useState<any[] | null>(
    null
  );

  const { data: currentUser }: any = useCurrentUser();
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const { allUsers } = useAllUser();
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

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleMenuClick = (e: any) => {
    if (e.key === "student") {
      showStudent();
    } else if (e.key === "teacher") {
      showTeacher();
    } else if (e.key === "all") {
      setFilteredRoleMembers(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);

    if (value?.trim().length === 0) {
      setFilteredMembers([]);
      return;
    }

    const filtered = members[0]?.academyMembers?.filter((user: any) => {
      const fullName = `${user?.firstName} ${user?.lastName}`.toLowerCase();
      const email = user?.email?.toLowerCase();
      return (
        fullName?.includes(value.toLowerCase()) ||
        email?.includes(value.toLowerCase())
      );
    });

    setFilteredMembers(filtered);
  };

  const showStudent = () => {
    const filteredData = members[0]?.academyMembers?.filter(
      (user: any) => user?.role === "student"
    );
    setFilteredRoleMembers(filteredData);
  };
  const showTeacher = () => {
    const filteredData = members[0]?.academyMembers?.filter(
      (user: any) => user?.role === "teacher"
    );
    setFilteredRoleMembers(filteredData);
  };

  // const currentUserId = currentUser?.id;
  const { mutate: handleLeaveAcademy } = useMutation({
    mutationKey: ["leaveAcademy"],
    mutationFn: async ({
      academyName,
      userId,
    }: {
      academyName: string;
      userId: string;
    }) => {
      return await axiosPublic.post("/api/v1/user/leave-academy", {
        userId,
        academyName,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["allAcademies"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setAcademyModal(false);
      Toast({
        type: "success",
        message: "",
        description: "You have left the academy",
      })();
    },
  });

  // const academyId = currentUser?.academyId;
  // const userId = currentUser?.id;
  // const academyId = allUsers
  //   ?.filter(
  //     (user: any) =>
  //       user?.role === "student" &&
  //       members[0]?.academyMembers?.some(
  //         (member: any) => member?.id === user?.id
  //       ) // Default to false if undefined
  //   )
  //   .map((user: any) => user?.academyId);
  const { mutate: handleRemoveMember } = useMutation({
    mutationKey: ["removeMember"],
    mutationFn: async ({
      academyId,
      userId,
    }: {
      academyId: string;
      userId: string;
    }) => {
      return await axiosPublic.delete(
        `/academy/remove-member/${academyId}/${userId}`
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allAcademies"] });
      // queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      const showNotification = Toast({
        type: "success",
        message: "User removed",
        description: "",
      });
      showNotification();
    },
  });

  const academyId = allUsers?.find(
    (user: any) =>
      user?.role === "student" &&
      members[0]?.academyMembers?.some((member: any) => member?.id === user?.id)
  )?.academyId;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg">
      {/* table */}
      <section>
        <div className="flex flex-col">
          <span className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="space-y-1">
                <h1 className="font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl">All Students and Teachers</p>{" "}
                </h1>
                <p className="text-slate-600 text-md">
                  Manage your academy members and their roles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() => setAcademyModal(true)}
                icon={<PiStudent className="text-xl" />}
                // disabled={isButtonDisabled || loading}
                // loading={loading}
                htmlType="submit"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                type="primary"
                className={`bg-white text-sm font-semibold h-[40px] px-8 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-gray-200`}
              >
                Explore academies
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

              {currentUser?.role === "teacher" ? (
                <Dropdown
                  arrow={true}
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Update notice",
                        icon: <IoMdNotificationsOutline className="!text-xl" />,
                        onClick: () => setNoticeModal(true),
                      },
                      // {
                      //   key: "2",
                      //   label: (
                      //     <Popconfirm
                      //       title="Leave academy"
                      //       description={
                      //         <p className="text-sm">
                      //           Are you sure you want to leave the academy?
                      //         </p>
                      //       }
                      //       okText="Yes"
                      //       cancelText="No"
                      //       onConfirm={() =>
                      //         handleLeaveAcademy({
                      //           academyName: currentUser?.academyName,
                      //           userId: currentUser?.id,
                      //         })
                      //       }
                      //     >
                      //       <span className="text-sm text-red-500 font-semibold cursor-pointer">
                      //         Leave academy
                      //       </span>
                      //     </Popconfirm>
                      //   ),
                      //   icon: <LogOut size={14} />,
                      //   onClick: () => setNoticeModal(true),
                      // },
                    ],
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Button
                      className="!px-[20px] py-[19px]"
                      // onClick={() => setNoticeModal(true)}
                      icon={<SlOptionsVertical className="text-base" />}
                      // disabled={isButtonDisabled || loading}
                      // loading={loading}
                      // htmlType="submit"
                    ></Button>
                  </a>
                </Dropdown>
              ) : (
                currentUser?.role === "student" && (
                  <Dropdown
                    arrow={true}
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: (
                            <Popconfirm
                              title="Leave academy"
                              description={
                                <p className="text-sm">
                                  Are you sure you want to leave the academy?
                                </p>
                              }
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() =>
                                handleLeaveAcademy({
                                  academyName: currentUser?.academyName,
                                  userId: currentUser?.id,
                                })
                              }
                            >
                              <span className="text-sm text-red-500 font-semibold cursor-pointer">
                                Leave academy
                              </span>
                            </Popconfirm>
                          ),
                          icon: <LogOut size={14} />,
                        },
                      ],
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Button
                        className="!px-[20px] py-[19px]"
                        // onClick={() => setNoticeModal(true)}
                        icon={<SlOptionsVertical className="text-base" />}
                        // disabled={isButtonDisabled || loading}
                        // loading={loading}
                        // htmlType="submit"
                      ></Button>
                    </a>
                  </Dropdown>
                )
              )}
            </div>

            {/* academy input list */}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-200 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {members[0]?.academyMembers?.length}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Members
                </p>
              </div>
            </div>
            <div className="bg-slate-200 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {
                    members[0]?.academyMembers?.filter(
                      (item: any) => item?.role === "teacher"
                    ).length
                  }
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Teachers
                </p>
              </div>
            </div>
            <div className="bg-slate-200 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {
                    members[0]?.academyMembers?.filter(
                      (item: any) => item?.role === "student"
                    ).length
                  }
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Students
                </p>
              </div>
            </div>
          </div>
          <section className="">
            <div className="">
              {/* <p className="font-semibold text-2xl text-[#030712] mb-5">
                All users
              </p> */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full">
                  <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
                  <input
                    value={searchItem}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search user...."
                    className="bg-white block w-full rounded-lg border border-neutral-300 bg-transparent h-[40px] pl-10 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-[#7ABA78] focus:outline-none focus:ring-neutral-950/5"
                  />
                </div>
                <div className=" cursor-pointer hover:bg-gray-100 hover:rounded-full p-2">
                  <Dropdown
                    overlay={
                      <Menu onClick={handleMenuClick}>
                        <Menu.Item
                          onClick={showStudent}
                          key="all"
                          icon={<User size={15} />}
                        >
                          All
                        </Menu.Item>
                        <Menu.Item
                          onClick={showStudent}
                          key="student"
                          icon={<ArrowUpOutlined />}
                        >
                          Student
                        </Menu.Item>
                        <Menu.Item key="teacher" icon={<ArrowDownOutlined />}>
                          Teacher
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <Button
                      className="text-sm font-semibold h-[40px] px-8"
                      icon={
                        <ArrowDownUp
                          size={16}
                          rotate={sortOrder === "desc" ? 180 : 0}
                        />
                      }
                    >
                      Sort by
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg ">
                    {loading ? (
                      <Loader />
                    ) : (
                      <table className="table-auto min-w-full rounded-xl">
                        <thead>
                          <tr className="bg-gray-50">
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
                            {currentUser?.role === "teacher" && (
                              <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {(searchItem?.trim()?.length > 0
                            ? filteredMembers
                            : filteredRoleMembers ?? members[0]?.academyMembers
                          )?.map((user: any) => (
                            <tr
                              key={user?.id}
                              // onClick={() => {
                              //   handleUserDetails(user?.id);
                              //   setModal1Open(true);
                              // }}
                              className="bg-white transition-all duration-500 hover:bg-gray-50 cursor-pointer"
                            >
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
                              <td className="p-5 whitespace-nowrap">
                                <div
                                  className={
                                    user?.role === "teacher"
                                      ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 flex w-fit items-center gap-1 py-[1px] px-[10px] rounded-full"
                                      : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 flex w-fit items-center gap-1 py-[1px] px-[10px] rounded-full"
                                  }
                                >
                                  {user?.role === "teacher" ? (
                                    <GraduationCap className="h-3 w-3 mr-1" />
                                  ) : (
                                    <BookOpen className="h-3 w-3 mr-1" />
                                  )}
                                  <p className="!text-[10px] font-bold">
                                    {user?.role === "teacher"
                                      ? "Teacher"
                                      : "Student"}
                                  </p>
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
                              {currentUser?.role === "teacher" && (
                                <td className="flex p-5 items-center gap-0.5">
                                  {/* <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex items-center">
                                  <FaEdit className="text-gray-500 group-hover:text-white" />
                                </button> */}
                                  <Popconfirm
                                    title="Remove user"
                                    description={
                                      <p className="text-sm">
                                        Are you sure you want to remove this?
                                      </p>
                                    }
                                    okText={
                                      <div
                                        className="p-5"
                                        onClick={() =>
                                          handleRemoveMember({
                                            academyId,
                                            userId: user?.id,
                                          })
                                        }
                                      >
                                        Yes
                                      </div>
                                    }
                                    cancelText="No"
                                  >
                                    <Tooltip title="Remove user">
                                      <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center">
                                        <FaTrashAlt className="text-gray-500 group-hover:text-white" />
                                      </button>
                                    </Tooltip>
                                  </Popconfirm>
                                </td>
                              )}
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
        <NoticeModal
          noticeModal={noticeModal}
          setNoticeModal={setNoticeModal}
        />
      </section>
    </div>
  );
};

export default InstitutionTable;
