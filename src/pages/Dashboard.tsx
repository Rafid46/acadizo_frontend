/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LuHome, LuLogOut } from "react-icons/lu";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
// import logo from "../assets/icons/acadizo_logo.png";
import icon from "../assets/icons/acadizo_icon.png";
import { PiStudent } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { RiHomeOfficeLine } from "react-icons/ri";
import { AuthContext } from "../providers/AuthProvider";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut, loading }: any = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    logOut()
      .then(() => {
        // // console.log(res.data);
        // console.log("logged out");
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
  useEffect(() => {
    if (window.innerWidth < 746) {
      setIsMobile(true);
    }
  }, []);
  return (
    <Layout className="">
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
        background-color: #f6f6f7 !important;
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

    `}
      </style>
      {/* Sidebar */}
      <Layout style={{ height: "100vh" }}>
        {" "}
        <Sider
          style={{ height: "100%" }}
          collapsedWidth={isMobile ? 0 : 70}
          width={!isMobile ? 250 : "100%"}
          className="bg-[#ffffff] border-r border-[#C1D8C3] z-50"
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
                  className={`${
                    isMobile ? " " : "flex items-start"
                  } ml-6 gap-x-2  mt-4 mb-2`}
                >
                  {isMobile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-x-2 mt-2">
                        <img
                          className="w-[35px] rounded-[10px]"
                          src={icon}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <p className="text-primary-color font-bold text-[14px]">
                            Acadizo
                          </p>
                          <p className="font-semibold text-[12px] text-text-second-color -mt-[2px]">
                            description
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button
                          className="border-none !focus:outline-none custom-button shadow-none mr-2"
                          icon={
                            collapsed ? <MenuOutlined /> : <MenuFoldOutlined />
                          }
                          onClick={() => setCollapsed(!collapsed)}
                        />
                      </div>
                    </div>
                  ) : (
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
                        <p className="font-semibold text-[12px] text-text-second-color -mt-[2px]">
                          description
                        </p>
                      </div>
                    </div>
                  )}

                  {/* <img className="w-[130px]" src={logo} alt="" /> */}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Menu
              className={`bg-[#ffffff] !border-none mt-4 ${
                collapsed ? "p-[7px]" : "menu-expanded"
              }`}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: (
                    <NavLink
                      onClick={() => isMobile && setCollapsed(!collapsed)}
                      to="/about"
                    >
                      Dashboard
                    </NavLink>
                  ),
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: (
                    <NavLink
                      onClick={() => isMobile && setCollapsed(!collapsed)}
                      to="/modules"
                    >
                      Modules
                    </NavLink>
                  ),
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "Users",
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
                          onClick={() => isMobile && setCollapsed(!collapsed)}
                          to="/institution/students"
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
                          onClick={() => isMobile && setCollapsed(!collapsed)}
                          to="/institution/overview"
                        >
                          Students
                        </NavLink>
                      ),
                      icon: <PiStudent />,
                    },
                  ],
                },
              ]}
            />
            {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}
            {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100">
            <div className="flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {collapsed ? (
                  <Avatar
                    shape="square"
                    className="h-10 w-10 rounded-full"
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                  />
                ) : (
                  <div className="flex items-center  bg-[#F2FCF2] px-6 py-4 rounded-[12px]">
                    <div className="flex-shrink-0">
                      <Avatar
                        shape="square"
                        className="h-10 w-10 rounded-full"
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                      />
                    </div>
                    <div className="flex-1 ml-3">
                      <p className="text-sm font-medium text-white truncate">
                        Mostafa AL Rafid
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        hello@gmail.com
                      </p>
                    </div>
                  </div>
                )}
              </span>
            </div>
          </div> */}
          </div>
        </Sider>
      </Layout>
      {/* Main content area */}
      <Layout>
        <Header
          className="border-b border-[#C1D8C3]"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div
            className={`flex items-center justify-between  overflow-hidden py-3 lg:p-3`}
          >
            <Button
              className={`border-none !focus:outline-none mx-3 lg:mx-0 shadow-none ${
                collapsed ? "block lg:block" : "hidden lg:block"
              }`}
              icon={collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />

            <Dropdown
              //   trigger={["click"]}
              className=""
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
        </Header>
        <Content
          className={collapsed ? "block lg:block" : "hidden lg:block"}
          style={{
            // margin: "10px 10px",
            padding: isMobile ? 8 : 0,
            background: "white",
            borderRadius: "10px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
