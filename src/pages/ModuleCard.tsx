/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  Checkbox,
  Collapse,
  Dropdown,
  Popover,
  Space,
  theme,
  Tooltip,
} from "antd";

import useModules from "../hooks/useModules";
import { FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BiCollapse, BiDownload, BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Toast from "../common/Toast";
import useCurrentModules from "../hooks/useCurrentModules";
import empty from "../assets/images/module empty.png";
import useCurrentUser from "../hooks/useCurrentUser";
import useAcademies from "../hooks/useAcademies";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../common/Loader";
import { IoMdEye, IoMdMenu } from "react-icons/io";
import EditModuleDrawer from "./EditModuleDrawer";
import type { PopconfirmProps } from "antd";
import { Popconfirm } from "antd";
import moment from "moment";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { Grid3X3, List } from "lucide-react";
import { RiSoundModuleFill } from "react-icons/ri";
import { FcOvertime } from "react-icons/fc";

const ModuleCard = ({ showDrawer }: any) => {
  const { allModules, refetch }: any = useModules();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [buttonText, setButtonText] = useState(
    <LiaExpandArrowsAltSolid className="text-2xl custom_button_style_icon" />
  );
  const [selectall, setSelectAll] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const axiosPublic = useAxios();
  const { data: currentUser } = useCurrentUser();
  const { data: academyLists } = useAcademies();
  const { token } = theme.useToken();
  const { matchedModules: academyModules, isLoading }: any =
    useCurrentModules();
  const currentUserEmail = currentUser?.email;
  const joinedAcademyDetails = academyLists?.find((item: any) =>
    item?.academyMembers?.some(
      (member: any) => member?.email === currentUserEmail
    )
  );

  useEffect(() => {
    if (allModules?.length > 0) {
      setActiveKeys(allModules.map((_: any, index: any) => String(index)));
    }
  }, [allModules]);

  const handleToggleCollapse = () => {
    setActiveKeys((prev) =>
      prev.length ? [] : allModules.map((_: any, index: any) => String(index))
    );
    setButtonText(
      activeKeys.length ? (
        <Tooltip title="Expand all">
          <LiaExpandArrowsAltSolid className="text-2xl custom_button_style_icon" />
        </Tooltip>
      ) : (
        <Tooltip title="Collapse all">
          <BiCollapse className="text-2xl custom_button_style_icon" />
        </Tooltip>
      )
    );
  };

  const handleCollapseChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };
  // console.log(allModules, "all modulesss");

  const handleDownload = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl?.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // delete single module
  const deleteModule = useMutation({
    mutationKey: ["deleteModule"],
    mutationFn: (moduleId: string) => {
      return axiosPublic.delete(`/modules/${moduleId}`);
    },
    onSuccess: () => {
      refetch();
      const showNotification = Toast({
        type: "success",
        message: "",
        description: "Module deleted successfully",
      });
      showNotification();
    },
    onError: () => {
      const showNotification = Toast({
        type: "error",
        message: "",
        description: "Something went wrong",
      });
      showNotification();
    },
  });

  const handleDeleteModule = (moduleId: any) => {
    deleteModule?.mutate(moduleId);
  };

  // delete many modules
  const handleSelectAll = () => {
    if (selectall?.length === academyModules?.length) {
      setSelectAll([]);
    } else {
      setSelectAll(academyModules?.map((module: any) => module.moduleId));
    }
  };

  const handleSelectChange = (moduleId: string) => {
    setSelectAll((prev) => {
      const isSelected = prev.includes(moduleId);
      if (isSelected) {
        return prev.filter((id) => id !== moduleId); // Deselect the clicked module
      } else {
        return [...prev, moduleId]; // Select the clicked module
      }
    });
  };

  // multiple delete
  const deleteMultipleModules = useMutation({
    mutationKey: ["deleteMultipleModules"],
    mutationFn: ({
      moduleIds,
      academyId,
    }: {
      moduleIds: string[];
      academyId: string;
    }) => {
      return axiosPublic.delete(`/modules/selected-module/modules-delete`, {
        data: { moduleIds, academyId },
      });
    },
    onSuccess: () => {
      refetch();
      const showNotification = Toast({
        type: "success",
        message: "Successfully deleted",
        description: "",
      });
      showNotification();
    },
    onError: () => {
      const showNotification = Toast({
        type: "error",
        message: "Something went wrong",
        description: "",
      });
      showNotification();
    },
  });
  const academyId = joinedAcademyDetails?.academyId;
  const handleDeleteAllModules = () => {
    if (selectall.length > 0 && academyId) {
      deleteMultipleModules?.mutate({ moduleIds: selectall, academyId });
    }
  };
  const showEditDrawer = (module: any) => {
    setSelectedModule(module);
    setOpen(true);
  };
  // const isDarkColor = (hex: string | undefined | null) => {
  //   if (typeof hex !== "string") return false; // default to light text

  //   hex = hex.replace("#", "");

  //   if (hex.length === 3) {
  //     hex = hex
  //       .split("")
  //       .map((c) => c + c)
  //       .join("");
  //   }

  //   const r = parseInt(hex.substring(0, 2), 16);
  //   const g = parseInt(hex.substring(2, 2), 16);
  //   const b = parseInt(hex.substring(4, 2), 16);

  //   return r + g + b < 400;
  // };

  // const moduleColor = academyModules?.map((module: any) => module?.color);
  // const textColor = isDarkColor(moduleColor)
  //   ? "#000000" < "#ffffff"
  //   : "#000000";

  // const confirm: PopconfirmProps["onConfirm"] = (e: any) => {
  //   handleDeleteModule(module?.moduleId);
  //   message.success("Click on Yes");
  // };

  const cancel: PopconfirmProps["onCancel"] = (e: any) => {
    console.log(e);
  };

  // search modules
  const search = query?.trim()?.toLowerCase();
  const filteredData = academyModules?.filter(
    (item: any) =>
      item?.title?.toLowerCase()?.includes(search) ||
      item?.description?.toLowerCase()?.includes(search) ||
      item?.heading?.toLowerCase()?.includes(search)
  );

  const toggleView = (mode: "grid" | "list") => {
    setViewMode(mode);
  };
  return (
    <div className="max-w-screen-xl mx-auto p-5 pt-0">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2 mb-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Tooltip title="Submit your answer">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <RiSoundModuleFill className="h-6 w-6 text-white" />
                </div>
              </Tooltip>
              Modules
            </h1>
            <p className="text-slate-600">
              Ask questions, share knowledge, and engage with your peers
            </p>
          </div>

          {academyModules?.length !== 0 && (
            <>
              <div className="flex items-center gap-2 border border-gray-400 rounded-lg py-1 text-sm px-2">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={
                    selectall?.length === academyModules?.length &&
                    academyModules?.length > 0
                  }
                />

                <p>Select all</p>
              </div>
              {selectall?.length > 0 && (
                <Button
                  icon={<MdDeleteOutline />}
                  onClick={handleDeleteAllModules}
                  className="mb-4 custom_button_style_secondary w-fit"
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="pl-[9px] overflow-hidden w-[30px] h-[30px] hover:w-[270px] bg-[#7ABA78] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
              <div className="flex items-center justify-center fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                >
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules...."
                type="text"
                className="outline-none text-[12px] bg-transparent w-full text-white font-normal px-4 placeholder:text-white"
              />
            </div>
            <Button
              onClick={handleToggleCollapse}
              className="custom_button_style_icon w-fit"
            >
              {buttonText}
            </Button>
          </div>
          <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            <Button
              type={viewMode === "grid" ? "primary" : "default"}
              onClick={() => toggleView("grid")}
              className={`
                h-8 px-3 rounded-md transition-all duration-200
                ${
                  viewMode === "grid"
                    ? "!bg-gray-400 !text-white shadow-sm !hover:bg-blue-600"
                    : "!text-gray-600 !hover:text-gray-900 !hover:bg-gray-50"
                }
              `}
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Grid
            </Button>
            <Button
              type={viewMode === "list" ? "primary" : "default"}
              onClick={() => toggleView("list")}
              className={`
                h-8 px-3 rounded-md transition-all duration-200
                ${
                  viewMode === "list"
                    ? "!bg-gray-400 !text-white shadow-sm !hover:bg-blue-600"
                    : "!text-gray-600 !hover:text-gray-900 !hover:bg-gray-50"
                }
              `}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : academyModules?.length > 0 ? (
          <div className="bg-gray-50 rounded-2xl p-5 h-full">
            <div
              className={`grid grid-cols-1 gap-4 lg:gap-2 sm:grid-cols-2 ${
                viewMode === "grid" ? "lg:grid-cols-3" : "lg:grid-cols-1"
              }`}
            >
              {filteredData?.map((module: any, index: number) => (
                <div key={module?.moduleId} className="flex items-start gap-2">
                  <Checkbox
                    onChange={() => handleSelectChange(module?.moduleId)}
                    checked={selectall?.includes(module?.moduleId)}
                  />
                  <Collapse
                    bordered={false}
                    style={{ background: token.colorBgContainer }}
                    key={module?.moduleId}
                    // expandIcon={() => (
                    //   <Dropdown
                    //     // trigger={["click"]}
                    //     menu={{
                    //       items: [
                    //         {
                    //           key: "1",
                    //           label: (
                    //             <span
                    //               onClick={(e) => {
                    //                 e.stopPropagation();
                    //                 handleDeleteModule(module?.moduleId);
                    //               }}
                    //             >
                    //               Delete
                    //             </span>
                    //           ),
                    //           icon: <MdDeleteOutline className="!text-xl" />,
                    //         },
                    //         {
                    //           key: "2",
                    //           label: (
                    //             <span
                    //               onClick={(e) => {
                    //                 showEditDrawer(module);
                    //                 e.stopPropagation();
                    //               }}
                    //             >
                    //               Edit
                    //             </span>
                    //           ),
                    //           icon: <BiEdit className="!text-xl" />,
                    //         },
                    //       ],
                    //     }}
                    //     arrow={{ pointAtCenter: true }}
                    //   >
                    //     <Button
                    //       onClick={(e) => e.stopPropagation()}
                    //       className="custom_button_style_icon"
                    //     >
                    //       <IoMdMenu className="!text-xl" />
                    //     </Button>
                    //   </Dropdown>
                    // )}
                    activeKey={activeKeys}
                    onChange={handleCollapseChange}
                    defaultActiveKey={"1"}
                    className={`w-full ${
                      viewMode === "grid" ? "lg:w-[500px]" : "lg:w-full"
                    } mb-4`}
                    items={[
                      {
                        key: String(index),
                        label: (
                          <p className="!font-semibold">
                            <Badge
                              style={{ boxShadow: "none" }}
                              count={index + 1}
                              className="mr-2 !shadow-none"
                              color="#C7D9DD"
                            />
                            {module?.heading}: {module?.title}
                          </p>
                        ),
                        children: (
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col">
                              {/* <p className="text-[10px] text-gray-400">
                                {module?.createdAt &&
                                  moment(module?.createdAt).format(
                                    "DD-MM-YYYY"
                                  )}
                              </p> */}
                              <div className="text-sm text-gray-500 flex flex-col bg-white rounded-lg p-3">
                                <div
                                  className="prose prose-sm break-words overflow-hidden text-ellipsis max-w-full"
                                  dangerouslySetInnerHTML={{
                                    __html: module?.description || "",
                                  }}
                                ></div>

                                <div>
                                  {module?.file && (
                                    <a
                                      href={`http://localhost:3000/file/${module?.file}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download
                                    >
                                      <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50 mt-3">
                                        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
                                          <div className="flex gap-2">
                                            <div className="text-primary-color text-3xl">
                                              <FaRegFileAlt />
                                            </div>

                                            <div>
                                              <p className="text-white">
                                                {module?.file?.length >= 15
                                                  ? `${module?.file?.substring(
                                                      0,
                                                      15
                                                    )}...`
                                                  : module?.file}
                                              </p>
                                              <p className="text-gray-500">
                                                Attachment
                                              </p>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() =>
                                              handleDownload(module?.file)
                                            }
                                            className="text-gray-200 text-xl hover:bg-white/10 p-1  rounded-full transition-colors ease-linear"
                                          >
                                            <BiDownload />
                                          </button>
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <FcOvertime />
                                <p className="text-[10px] text-gray-800 mt-1">
                                  Submitted at:{" "}
                                  {moment(module?.createdAt)
                                    .tz("Asia/Dhaka")
                                    .format("D MMM YYYY, h:mm A")}
                                </p>
                              </div>
                            </div>
                            <div className="flex ">
                              <Popover
                                content={
                                  <div className="w-[500px]">
                                    <p className="text-[10px] text-gray-400">
                                      {module?.createdAt &&
                                        moment(module?.createdAt).format(
                                          "DD-MM-YYYY"
                                        )}
                                    </p>
                                    <p className="text-[12px] text-gray-400">
                                      {module?.title}
                                    </p>
                                    {/* <Divider className="my-2" /> */}
                                    <div
                                      className="prose prose-sm break-words overflow-hidden text-ellipsis max-w-full border border-gray-200 rounded-lg p-3 mt-2"
                                      dangerouslySetInnerHTML={{
                                        __html: module?.description || "",
                                      }}
                                    ></div>
                                  </div>
                                }
                                title={
                                  <p className="font-bold">{module?.heading}</p>
                                }
                              >
                                <Button
                                  className="custom_button_style_icon"
                                  icon={<IoMdEye />}
                                ></Button>
                              </Popover>
                              <Dropdown
                                className="p-0"
                                destroyPopupOnHide={false}
                                trigger={["click", "hover"]}
                                menu={{
                                  items: [
                                    {
                                      key: "1",
                                      label: (
                                        <Popconfirm
                                          title="Delete the module"
                                          description="Are you sure to delete this module?"
                                          onConfirm={() =>
                                            handleDeleteModule(module?.moduleId)
                                          }
                                          onCancel={cancel}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <span>Delete</span>
                                        </Popconfirm>
                                      ),
                                      icon: (
                                        <MdDeleteOutline className="!text-xl" />
                                      ),
                                    },
                                    {
                                      key: "2",
                                      label: "Edit",
                                      icon: <BiEdit className="!text-xl" />,
                                      onClick: (e) => {
                                        e.domEvent.stopPropagation();
                                        setTimeout(
                                          () => showEditDrawer(module),
                                          0
                                        );
                                      },
                                    },
                                    // {
                                    //   key: "2",
                                    //   label: (
                                    //     <p
                                    //       className="!border-none bg-transparent hover:bg-transparent"
                                    //       // icon={<BiEdit className="!text-xl" />}
                                    //       onClick={(e) => {
                                    //         e.stopPropagation();
                                    //         requestAnimationFrame(() => {
                                    //           console.log("Edit clicked");
                                    //           showEditDrawer(module);
                                    //         });
                                    //       }}
                                    //     >
                                    //       Edit
                                    //     </p>
                                    //   ),
                                    //   icon: <BiEdit className="!text-xl" />,
                                    // },
                                  ],
                                }}
                                arrow={{ pointAtCenter: true }}
                              >
                                <Button
                                  onClick={(e) => e.stopPropagation()}
                                  className="custom_button_style_icon"
                                >
                                  <Space>
                                    <IoMdMenu className="!text-xl" />
                                  </Space>
                                </Button>
                              </Dropdown>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
              <EditModuleDrawer
                setOpen={setOpen}
                open={open}
                isLoading={isLoading}
                module={selectedModule}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-4">
            <img src={empty} width={600} alt="" />
            <Button
              onClick={showDrawer}
              type="primary"
              icon={<FaPlus />}
              className="custom_button_style !h-[42px]"
            >
              Upload modules
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
