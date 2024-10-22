import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Spin,
  theme,
} from "antd";
import { Link, Outlet } from "react-router-dom";
import { TestSide } from "./TestSide";
import { LuHome, LuLogOut } from "react-icons/lu";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import logo from "../assets/icons/acadizo_logo.png";
import icon from "../assets/icons/acadizo_icon.png";
import CustomButton from "../common/CustomButton";
import { PiStudent } from "react-icons/pi";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
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
    {
      key: "4",
      label: "Logout",
      icon: <LuLogOut />,
    },
    // {
    //   key: "4",
    //   label: "Settings",
    //   icon: <SettingOutlined />,
    //   extra: "⌘S",
    // },
  ];

  return (
    <Layout>
      <style>
        {` 
        .ant-menu-item{
        color: #64748b !important;
        font-size: 12px;
        font-weight: 500 !important;
    }
        
        .ant-menu-item-selected {
         color: #1d4ed8 !important;
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
    }

        .hover-button {
        transition: background-color 0.3s ease, opacity 0.3s ease;
    }

        .hover-button:hover {
        opacity: 0.9;
    }

    
        `}
      </style>
      {/* Sidebar */}
      <Sider
        collapsedWidth={70}
        width={220}
        className="h-[100vh] bg-[#ffffff] border-r border-[#EEEDEB]"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            transition: "all 0.3s ease",
          }}
          className={`duration-300 ${
            collapsed ? "" : "border-b border-[#EEEDEB] mx-4"
          }`}
        >
          <div className="mt-4 mb-2">
            {collapsed ? (
              <img className="w-[40px] mx-auto" src={icon} alt="" />
            ) : (
              <div className="flex items-center  mt-4 mb-2">
                <img className="w-[40px]" src={icon} alt="" />
                <img className="w-[130px] flex mx-auto" src={logo} alt="" />
              </div>
            )}
          </div>
        </div>
        <div className="">
          <Menu
            className={`bg-[#ffffff] !border-none ${
              collapsed ? "p-[7px]" : "menu-expanded"
            }`}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/about">Dashboard</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/contact">Contact</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Users",
              },
              {
                key: "4",
                icon: <PiStudent />,
                label: "Students",
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
        </div>
      </Sider>
      {/* Main content area */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Dropdown
              //   trigger={["click"]}
              className="mr-[70px]"
              menu={{ items }}
            >
              <a className="px-6" onClick={(e) => e.preventDefault()}>
                <div className="flex items-center gap-x-2">
                  <Avatar
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    size={40}
                    icon={<UserOutlined />}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-text-color">
                      Mostafa AL Rafid
                    </p>
                    <p className="text-text-small font-normal text-text-secondary-color">
                      hello@gmail.com
                    </p>
                  </div>
                </div>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
