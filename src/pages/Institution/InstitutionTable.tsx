/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Dropdown, Menu, MenuProps } from "antd";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import Loader from "../../common/Loader";
import moment from "moment";
import { useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { SlOptionsVertical } from "react-icons/sl";

import NoticeModal from "./NoticeModal";
import { ArrowDownUp, BookOpen, GraduationCap, Users } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const InstitutionTable = ({
  setAcademyModal,
  setCreateUserModal,
  loading,
  members,
}: any) => {
  const [noticeModal, setNoticeModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
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
      icon: <IoMdNotificationsOutline className="!text-xl" />,
      onClick: () => setNoticeModal(true),
    },
  ];
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleMenuClick = ({ key }: { key: string }) => {
    setSortOrder(key as "asc" | "desc");
    // Your sort logic here
    console.log("Sort order:", key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="asc" icon={<ArrowUpOutlined />}>
        Ascending
      </Menu.Item>
      <Menu.Item key="desc" icon={<ArrowDownOutlined />}>
        Descending
      </Menu.Item>
    </Menu>
  );

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

              <Dropdown arrow={true} menu={{ items: dropItems }}>
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
              <NoticeModal
                setNoticeModal={setNoticeModal}
                noticeModal={noticeModal}
              ></NoticeModal>
            </div>

            {/* academy input list */}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <div className="px-2 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Members
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {members[0]?.academyMembers?.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <div className="px-2 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Teachers
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {" "}
                      {
                        members[0]?.academyMembers?.filter(
                          (item: any) => item?.role === "teacher"
                        ).length
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <div className="px-2 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Students
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {" "}
                      {
                        members[0]?.academyMembers?.filter(
                          (item: any) => item?.role === "teacher"
                        ).length
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </Card>
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
                    overlay={menu}
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
                            <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {(searchItem?.trim()?.length > 0
                            ? filteredMembers
                            : members[0]?.academyMembers
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
