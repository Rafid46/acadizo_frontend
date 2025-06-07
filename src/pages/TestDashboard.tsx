/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LuHome, LuLogOut } from "react-icons/lu";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import logo from "../assets/icons/acadizo_logo.png";
import icon from "../assets/icons/acadizo_icon.png";
import { PiStudent } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { CiUser, CiViewList } from "react-icons/ci";
import { RiHomeOfficeLine } from "react-icons/ri";
import { AuthContext } from "../providers/AuthProvider";
import useCurrentUser from "../hooks/useCurrentUser";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiBookFill } from "react-icons/ri";
import useCurrentNotice from "../hooks/useCurrentNotice";
import NotificationPopUp from "./NotificationPopUp";
import { GrWorkshop } from "react-icons/gr";
import { BsPostcard } from "react-icons/bs";

const { Header, Sider, Content } = Layout;

const TestDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, logOut, loading }: any = useContext(AuthContext);
  const { data: currentUser }: any = useCurrentUser();
  const matchedNotices = useCurrentNotice();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    logOut()
      .then(() => {
        // console.log(res.data);
        console.log("logged out");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/dashboard/update-profile">My Account</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Dashboard",
      icon: <LuHome />,
    },
    {
      key: "3",
      label: "Saved",
      icon: <MdOutlineCollectionsBookmark />,
    },
    {
      type: "divider",
    },
    // user
    //   ? {
    //       key: "4",
    //       label: "Logout",
    //       icon: <LuLogOut />,
    //       onClick: handleLogout,
    //     }
    //   : {
    //       key: "4",
    //       label: (
    //         <a href="/register">
    //           <p>Sign In</p>
    //         </a>
    //       ),
    //       icon: <LuLogOut />,
    //     },
    {
      key: "4",
      label: "Logout",
      icon: <LuLogOut />,
      onClick: handleLogout,
    },
  ];
  const desktopItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined className="!text-xl" />,
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
    {
      key: "2",
      icon: <RiBookFill className="!text-xl" />,
      label: <NavLink to="/dashboard/modules">Modules</NavLink>,
    },
    {
      key: "3",
      icon: <IoMdNotificationsOutline className="!text-xl" />,
      label: <NavLink to="/dashboard/notice">Notice</NavLink>,
    },

    {
      key: "4",
      icon: <RiHomeOfficeLine className="!text-xl" />,
      label: "Institution",
      children: [
        {
          key: "4-1",
          label: (
            <NavLink to="/dashboard/institution/overview">Overview</NavLink>
          ),
          icon: <CiViewList className="!text-xl" />,
        },
        {
          key: "4-2",
          label: (
            <NavLink to="/dashboard/institution/students">Students</NavLink>
          ),
          icon: <PiStudent className="!text-xl" />,
        },
        {
          key: "4-3",
          icon: <CiUser className="!text-xl" />,
          label: (
            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard/institution/users"
            >
              Users
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "5",
      icon: <GrWorkshop className="!text-xl" />,
      label: "Activities",
      children: [
        {
          key: "5-1",
          label: <NavLink to="/dashboard/activity/posts">Posts</NavLink>,
          icon: <BsPostcard className="!text-xl" />,
        },
        {
          key: "5-2",
          label: <NavLink to="">Students</NavLink>,
          icon: <PiStudent className="!text-xl" />,
        },
        {
          key: "5-3",
          icon: <CiUser className="!text-xl" />,
          label: (
            <NavLink onClick={() => setOpen(false)} to="">
              Users
            </NavLink>
          ),
        },
      ],
    },
  ];
  if (currentUser?.role === "teacher") {
    desktopItems.push({
      key: "5",
      icon: <UploadOutlined />,
      label: <NavLink to="/dashboard/AllUsers">All users</NavLink>,
    });
  }
  useEffect(() => {
    if (window.innerWidth < 746) {
      setIsMobile(true);
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout className="flex flex-col h-screen overflow-hidden">
      <style>
        {` 

        .ant-menu-item {
        color: #64748b !important;
        font-size: 12px;
        font-weight: 600 !important;

    }
        .ant-menu-item:hover {
         background-color: #f6f6f7 !important;
         border-radius: 12px !important;
         color: #007260 !important;

    }

        .ant-menu-item-content:hover {
         color: #007260 !important; 
    }
        
        .ant-menu-item-selected {
         color: #007260 !important;
         background-color: #DDF6D2 !important;
        //  border:1px solid #DDDDDD !important;
         border-radius: 12px !important;
    }
        .ant-menu-item-selected .ant-menu-title-content {
         color: #007260 !important;
         font-weight: 600 !important;
    }
        .ant-menu-submenu-title .ant-menu-title-content {
         font-weight: 600 !important;
       }

        .menu-expanded.ant-menu {
         padding: 7px !important;
    }
        
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
         padding: 10px 24px;

    }
        .ant-dropdown-menu-title-content {
         color: #64748b !important;
         font-size: 12px;
         font-weight: 600 !important;
    }

        .hover-button {
         transition: background-color 0.3s ease, opacity 0.3s ease;
    }

        .hover-button:hover {
         opacity: 0.9;
    }
        .ant-menu-title-content {
         color: #64748b !important;
         font-size: 12px;
    }

        .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
         background: none !important;
    }
  
        .ant-layout {
         background: white !important;
        }

        .ant-menu-submenu-title:hover {
         border-radius: 12px !important;
         color: #007260 !important;
        
        }

        .ant-menu .ant-menu-submenu-selected >.ant-menu-submenu-title {
        color: #64748b !important;
        
        }

        ant-menu-submenu-selected >.ant-menu-submenu-title {
         color: #007260 !important;
        }

         `}
      </style>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          placement="left"
          width={350}
          title={<img className="w-[100px] ml-3" src={logo} />}
          onClose={onClose}
          open={open}
        >
          <Menu
            className={`bg-[#ffffff] !border-none mt-4`}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <NavLink onClick={() => setOpen(false)} to="/about">
                    Dashboard
                  </NavLink>
                ),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <NavLink onClick={() => setOpen(false)} to="/modules">
                    Modules
                  </NavLink>
                ),
              },
              {
                key: "3",
                icon: <CiUser />,
                label: (
                  <NavLink onClick={() => setOpen(false)} to="/users">
                    Users
                  </NavLink>
                ),
              },
              {
                key: "4",
                icon: <IoMdNotificationsOutline />,
                label: (
                  <NavLink onClick={() => setOpen(false)} to="/notice">
                    Notice
                  </NavLink>
                ),
              },

              {
                key: "4",
                icon: <RiHomeOfficeLine />,
                label: "Institution",
                children: [
                  {
                    key: "4-1",
                    label: (
                      <NavLink
                        onClick={() => setOpen(false)}
                        to="/institution/overview"
                      >
                        Overview
                      </NavLink>
                    ),
                    icon: <CiViewList />,
                  },
                  {
                    key: "4-2",
                    label: (
                      <NavLink
                        onClick={() => setOpen(false)}
                        to="/institution/overview"
                      >
                        Students
                      </NavLink>
                    ),
                    icon: <PiStudent />,
                  },
                  {
                    key: "3",
                    icon: <CiUser />,
                    label: (
                      <NavLink onClick={() => setOpen(false)} to="/users">
                        Users
                      </NavLink>
                    ),
                  },
                ],
              },
            ]}
          />
        </Drawer>
      ) : (
        <Sider
          style={{
            overflow: "hidden",
          }}
          collapsedWidth={70}
          width={250}
          className="!h-screen bg-[#ffffff] border-r border-[#C1D8C3]  backfz-50"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              transition: "all 0.3s ease",
            }}
            className={`duration-300 ${collapsed ? "" : ""}`}
          >
            <div className="mt-4 mb-2">
              {collapsed ? (
                <img
                  className="w-[35px] rounded-[10px] mx-auto"
                  src={icon}
                  alt=""
                />
              ) : (
                <div
                  className={`flex items-start
                 ml-6 gap-x-2  mt-4 mb-2`}
                >
                  <div className="flex items-center justify-between gap-x-2 ml-4">
                    <img
                      className="w-[35px] rounded-[10px]"
                      src={icon}
                      alt=""
                    />
                    <div className="flex flex-col ">
                      <p className="text-primary-color font-bold text-[14px]">
                        Acadizo
                      </p>
                      <p
                        className={`font-semibold text-[12px] text-text-second-color -mt-[2px] ${
                          !currentUser?.academyName && ""
                        }`}
                      >
                        {currentUser?.academyName}
                      </p>
                    </div>
                  </div>

                  {/* <img className="w-[130px]" src={logo} alt="" /> */}
                </div>
              )}
            </div>
          </div>
          <Menu
            className={`bg-[#ffffff] !border-none mt-4 ${
              collapsed ? "p-[7px]" : "menu-expanded"
            }`}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={desktopItems}
          />
        </Sider>
      )}

      {/* Main content area */}
      <Layout>
        <Header
          className="border-b border-[#C1D8C3]"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div
            className={`flex items-center justify-between  overflow-hidden  px-3 pt-3`}
          >
            {isMobile ? (
              <Button
                className={`border-none !focus:outline-none mx-3 lg:mx-0 shadow-none`}
                icon={<MenuOutlined />}
                onClick={showDrawer}
              />
            ) : (
              <Button
                className={`border-none !focus:outline-none mx-3 lg:mx-0 shadow-none`}
                icon={collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}

            <div className="flex items-center">
              <Badge
                color="#7aba78"
                className="cursor-pointer mr-5"
                count={matchedNotices?.length}
              >
                <NotificationPopUp />
              </Badge>
              <Dropdown
                className="custom_dropdown"
                trigger={["click", "hover"]}
                menu={{ items }}
              >
                <a className="px-6">
                  {loading ? (
                    <div className="flex items-center gap-x-2">
                      <Avatar src="" size={40} className="bg-gray-200" />
                      <div className="flex flex-col gap-y-2">
                        <p className="bg-gray-200 w-[100px] h-[10px] rounded-[10px]"></p>
                        <p className="bg-gray-200 w-[80px] h-[10px] rounded-[10px]"></p>
                      </div>
                      <FaAngleDown className="ml-2 text-text-secondary-color" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <Avatar
                        src={user?.photoURL}
                        size={40}
                        icon={<UserOutlined />}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-text-color">
                          {user?.displayName}
                        </p>
                        <p className="text-text-small font-normal text-text-secondary-color">
                          {user?.email}
                        </p>
                      </div>
                      <FaAngleDown className="ml-2 text-text-secondary-color" />
                    </div>
                  )}
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "5px 5px",
            padding: isMobile ? 8 : 24,
            background: "white",
            borderRadius: "10px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TestDashboard;
