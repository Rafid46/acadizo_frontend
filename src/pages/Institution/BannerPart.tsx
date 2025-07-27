/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "antd";
import moment from "moment";
import { CiCalendar, CiStar } from "react-icons/ci";
import useCurrentModules from "../../hooks/useCurrentModules";
import useCurrentActivities from "../../hooks/useCurrentAcitivies";
import { Link } from "react-router-dom";

const BannerPart = ({ joinedAcademyDetails }: any) => {
  const { matchedModules }: any = useCurrentModules();
  const { matchedActivity }: any = useCurrentActivities();

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
                <div className="relative -mt-16 mb-4 flex justify-between items-start">
                  <Avatar
                    size={100}
                    src={
                      joinedAcademyDetails?.[0]?.academyLogoUrl || // Your image URL
                      undefined
                    }
                    className="flex items-center justify-center"
                    style={{
                      backgroundImage: `url("https://vercel.com/api/www/avatar/eb3qpvJHzzjxaYdU9mUIuAO9")`,
                    }}
                  >
                    {joinedAcademyDetails?.[0]?.academyName && (
                      <p className="text-gray-600 font-bold text-[20px]">
                        {joinedAcademyDetails?.[0].academyName
                          .charAt(0)
                          .toUpperCase()}
                      </p>
                    )}
                  </Avatar>
                </div>

                <div className="flex lg:flex-row flex-col items-center justify-between">
                  {/* Profile info */}
                  <div>
                    <h1 className="text-3xl font-bold mb-1">
                      {joinedAcademyDetails[0]?.academyName}
                    </h1>
                    <p className="text-gray-600 mb-2">
                      {joinedAcademyDetails[0]?.academyDescription}
                    </p>
                  </div>
                  {/* Stats */}
                  {/* Action buttons */}
                  <div className="flex-col">
                    {/* <div className="flex items-center gap-2 pt-4">
                      <Button className="rounded-full bg-gray-100 hover:bg-gray-200">
                        Message
                      </Button>
                      <Button className="rounded-full">Book a session</Button>
                      <Button ghost>
                        <FiMoreVertical className="w-4 h-4" />
                      </Button>
                    </div> */}
                    <div className="flex gap-4 mt-6">
                      <div className="bg-[#EEF2FE] rounded-2xl p-6 cursor-pointer">
                        <div className="text-2xl font-bold text-purple-600">
                          {matchedModules?.length}
                        </div>

                        <Link to="/dashboard/modules">
                          <div className="text-gray-600 text-sm mt-5 font-semibold">
                            Modules
                          </div>
                        </Link>
                      </div>
                      <div className="bg-[#F0F9FF] rounded-2xl p-6 cursor-pointer">
                        <div className="text-2xl font-bold text-purple-600">
                          {matchedActivity?.length}
                        </div>
                        <Link to="/dashboard/activity/posts">
                          <div className="text-gray-600 text-sm mt-5 font-semibold">
                            Activities
                          </div>
                        </Link>
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
                      {moment(joinedAcademyDetails[0]?.createdAt).format(
                        "MMMM D, YYYY"
                      )}
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
