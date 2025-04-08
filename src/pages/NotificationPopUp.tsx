import { Popover, Button } from "antd";
import { FaAccessibleIcon, FaRegBell } from "react-icons/fa";
import NotificationDd from "./Institution/NotificationDd";

const NotificationPopUp = () => {
  // Notification content inside the popover
  const content = (
    <div className="">
      {/* Header */}

      <div className="overflow-hidden w-fit lg:w-[450px] ">
        <div className="p-6 pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Notifications
          </h2>
          <button className="text-blue-600 text-sm font-medium">
            Mark all as read
          </button>
        </div>

        <div className="">
          <div className="flex px-6">
            <button className="text-blue-600 font-medium pb-3 border-b-2 border-blue-600 mr-6 flex items-center">
              All{" "}
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                2
              </span>
            </button>
            <button className="text-gray-500 font-medium pb-3 mr-6">
              Following
            </button>
            <button className="text-gray-500 font-medium pb-3">Archive</button>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto mt-5">
          {/* Notification 1 */}
          {/* <div className="p-6 flex">
            <div className="flex-shrink-0 mr-4 relative">
              <div className="absolute -left-1 top-0 w-2 h-2 bg-blue-600 rounded-full"></div>
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Ralph Edwards"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="font-semibold text-gray-900">
                  Ralph Edwards
                </span>
                <span className="text-gray-600"> wants to edit </span>
                <span className="font-semibold text-gray-900">
                  Tetrisly Design System
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-3">5 min ago</div>
              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Accept
                </Button>
                <Button className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  Deny
                </Button>
              </div>
            </div>
          </div> */}
          <NotificationDd />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <Popover
        content={content}
        title=""
        trigger={["click", "hover", "focus"]}
        arrow={{ pointAtCenter: true }}
      >
        <FaRegBell size={20} />
      </Popover>
    </div>
  );
};

export default NotificationPopUp;
