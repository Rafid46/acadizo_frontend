/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import moment from "moment";
import { CiCalendar, CiMapPin, CiStar } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";

const BannerPart = ({ currentAcademy }: any) => {
  return (
    <div>
      <div className="max-w-full mx-auto">
        <div className="rounded-lg overflow-hidden ">
          {/* Banner with gradient */}
          <div className="h-32 bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-500" />

          <div className="px-6 pb-6">
            {/* Profile section */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Profile image */}
                <div className="relative -mt-16 mb-4">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="rounded-full border-4 border-white w-32 h-32 object-cover"
                  />
                </div>
                <div className="flex lg:flex-row flex-col items-center justify-between">
                  {/* Profile info */}
                  <div>
                    <h1 className="text-2xl font-bold mb-1">
                      {currentAcademy?.academyName}
                    </h1>
                    <p className="text-gray-600 mb-2">
                      {currentAcademy?.academyDescription}
                    </p>
                  </div>
                  {/* Stats */}
                  {/* Action buttons */}
                  <div className="flex-col">
                    <div className="flex items-center gap-2 pt-4">
                      <Button className="rounded-full bg-gray-100 hover:bg-gray-200">
                        Message
                      </Button>
                      <Button className="rounded-full">Book a session</Button>
                      <Button ghost>
                        <FiMoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <div className="bg-[#EEF2FE] rounded-2xl p-6">
                        <div className="text-2xl font-bold text-purple-600">
                          351
                        </div>
                        <div className="text-gray-600 text-sm mt-5 font-semibold">
                          Completed Sessions
                        </div>
                      </div>
                      <div className="bg-[#F0F9FF] rounded-2xl p-6 ">
                        <div className="text-2xl font-bold text-purple-600">
                          2+
                        </div>
                        <div className="text-gray-600 text-sm mt-5 font-semibold">
                          Years Experiences
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Location and join date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-5 lg:mt-0">
                  {/* <div className="flex items-center gap-1">
                    <CiMapPin className="w-4 h-4" />
                    <span>San francisco, CA</span>
                  </div> */}
                  <div className="flex items-center gap-1">
                    <CiCalendar className="w-4 h-4" />
                    <span>
                      Created{" "}
                      {moment(currentAcademy?.createdAt).format("MMMM D, YYYY")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0(12)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPart;
