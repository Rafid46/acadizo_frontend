/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Collapse } from "antd";
import useModules from "../hooks/useModules";
import { FaRegFileAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { useEffect, useState } from "react";

const ModuleCard = () => {
  const { allModules }: any = useModules();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [buttonText, setButtonText] = useState("Expand all");

  // Ensure default open when data loads
  useEffect(() => {
    if (allModules?.length > 0) {
      setActiveKeys(allModules.map((_: any, index: any) => String(index))); // Extract keys
    }
  }, [allModules]);

  // Toggle all panels
  const handleToggleCollapse = () => {
    setActiveKeys((prev) =>
      prev.length ? [] : allModules.map((_: any, index: any) => String(index))
    );
    setButtonText(activeKeys.length ? "Expand All" : "Collapse All");
  };

  // Toggle individual panels without affecting others
  const handleCollapseChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]); // Ensure it's an array
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl text-[#030712] mb-5">Modules</p>
        <Button
          onClick={handleToggleCollapse}
          className="mb-4 custom_button_style_secondary w-fit"
        >
          {buttonText}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {allModules?.map((module: any, index: number) => (
          <div key={module?.moduleId} className="">
            <Collapse
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
                                        ? `${module?.file?.substring(0, 15)}...`
                                        : module?.file}
                                    </p>
                                    <p className="text-gray-500">Attachment</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDownload(module?.file)}
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
    </div>
  );
};

export default ModuleCard;
