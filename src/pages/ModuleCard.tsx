/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Collapse,
  Drawer,
  Dropdown,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import useModules from "../hooks/useModules";
import { FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BiDownload, BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Toast from "../common/Toast";
import useCurrentModules from "../hooks/useCurrentModules";
import empty from "../assets/images/module empty.png";
import useCurrentUser from "../hooks/useCurrentUser";
import useAcademies from "../hooks/useAcademies";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../common/Loader";
import { IoMdMenu } from "react-icons/io";
import Dragger from "antd/es/upload/Dragger";

const ModuleCard = ({ showDrawer }: any) => {
  const { allModules, refetch }: any = useModules();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [buttonText, setButtonText] = useState("Expand all");
  const [selectall, setSelectAll] = useState<any[]>([]);
  const axiosPublic = useAxios();
  const { data: currentUser } = useCurrentUser();
  const { data: academyLists } = useAcademies();
  const [form] = Form.useForm();
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
    setButtonText(activeKeys.length ? "Expand All" : "Collapse All");
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
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <p className="font-semibold text-2xl text-[#030712] mb-5">Modules</p>
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
        <Button
          onClick={handleToggleCollapse}
          className="mb-4 custom_button_style_secondary w-fit"
        >
          {buttonText}
        </Button>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : academyModules?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {academyModules?.map((module: any, index: number) => (
                <div key={module?.moduleId} className="flex items-start gap-2">
                  <Checkbox
                    onChange={() => handleSelectChange(module?.moduleId)}
                    checked={selectall?.includes(module?.moduleId)}
                  />
                  <Collapse
                    key={module?.moduleId}
                    expandIcon={() => (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "1",
                              label: (
                                <p
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteModule(module?.moduleId);
                                  }}
                                >
                                  Delete
                                </p>
                              ),
                              icon: <MdDeleteOutline className="!text-xl" />,
                            },
                            {
                              key: "2",
                              label: (
                                <p
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteModule(module?.moduleId);
                                  }}
                                >
                                  Edit
                                </p>
                              ),
                              icon: <BiEdit className="!text-xl" />,
                            },
                          ],
                        }}
                        arrow={{ pointAtCenter: true }}
                      >
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          className="custom_button_style_icon"
                        >
                          <IoMdMenu className="!text-xl" />
                        </Button>
                      </Dropdown>
                    )}
                    activeKey={activeKeys}
                    onChange={handleCollapseChange}
                    defaultActiveKey={"1"}
                    className="w-full lg:w-[500px] mb-4"
                    items={[
                      {
                        key: String(index),
                        label: (
                          <p className="!font-semibold">
                            <Badge
                              count={index + 1}
                              className="mr-2"
                              color="#C7D9DD"
                            />
                            {module?.heading}: {module?.title}
                          </p>
                        ),
                        children: (
                          <div className="text-sm text-gray-500 flex flex-col">
                            <div
                              className="break-words overflow-hidden text-ellipsis max-w-full"
                              dangerouslySetInnerHTML={{
                                __html: module?.description,
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
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
          </>
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
