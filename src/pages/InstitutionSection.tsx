import { Button } from "antd";
import { CiCalendar, CiMapPin, CiStar } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

const InstitutionSection = () => {
  return (
    <section>
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
                    <h1 className="text-2xl font-bold mb-1">Institute name</h1>
                    <p className="text-gray-600 mb-2">
                      Engineer at BB Agency Industry
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
                  <div className="flex items-center gap-1">
                    <CiMapPin className="w-4 h-4" />
                    <span>San francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiCalendar className="w-4 h-4" />
                    <span>Joined April 2021</span>
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
      {/* table */}
      <section>
        <div className="flex flex-col">
          <p className="font-semibold text-2xl text-[#030712] my-5">
            All users
          </p>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg border-gray-300">
                <table className="table-auto min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      <th>
                        <div className="flex items-center py-5 px-5">
                          <input
                            type="checkbox"
                            value=""
                            className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                          />
                        </div>
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Company
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        User ID
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]">
                        Full Name &amp; Email
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Type
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Industry Type
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Join Date
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Budget
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Country
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Status
                      </th>
                      <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td>
                        <div className="flex items-center py-5 px-5">
                          <input
                            type="checkbox"
                            value=""
                            className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                          />
                        </div>
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Louis Vuitton
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        20010510
                      </td>
                      <td className="px-5 py-3">
                        <div className="w-48 flex items-center gap-3">
                          <img
                            src="https://pagedone.io/asset/uploads/1697536419.png"
                            alt="Floyd"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="data">
                            <p className="font-normal text-sm text-gray-900">
                              Floyd Miles
                            </p>
                            <p className="font-normal text-xs leading-5 text-gray-400">
                              floydmiles@pagedone.io
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Customer
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Accessories
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        Jun. 24, 2023
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        $18,500
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        United States
                      </td>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default InstitutionSection;
