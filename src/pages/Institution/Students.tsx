/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { BookOpen, GraduationCap, Loader } from "lucide-react";
import useAllUser from "../../hooks/useAllUser";
import useAcademies from "../../hooks/useAcademies";
import useCurrentUser from "../../hooks/useCurrentUser";
import moment from "moment";

const Students = () => {
  const { loading }: any = useContext(AuthContext);
  const { allUsers } = useAllUser();
  const { data: currentUser }: any = useCurrentUser();
  const [joinedAcademyDetails, setJoinedAcademyDetails] = useState<any[]>([]);
  const { data: academyLists }: any = useAcademies();
  useEffect(() => {
    if (academyLists) {
      academyLists?.map((item: any) => {
        const academy = item?.academyMembers?.find(
          (member: any) => member?.email === currentUser?.email
        );
        if (academy) setJoinedAcademyDetails((prev: any) => [...prev, item]);
      });
    }
  }, [academyLists, currentUser?.email]);

  return (
    <div className="max-w-screen-xl mx-auto p-5 pt-0">
      <div className="flex items-start gap-2 mb-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            Students
          </h1>
          {/* <p className="text-slate-600">
            Ask questions, share knowledge, and engage with your peers
          </p> */}
        </div>
      </div>
      <div className="overflow-hidden border rounded-lg ">
        {loading ? (
          <Loader />
        ) : (
          <table className="table-auto min-w-full rounded-xl">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  User ID
                </th>
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize min-w-[150px]">
                  Full Name &amp; Email
                </th>
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  Role
                </th>
                {/* <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                                    Industry Type
                                  </th> */}
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  Join Date
                </th>
                {/* <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                                    Budget
                                  </th> */}
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  Status
                </th>
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  Gender
                </th>
                <th className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-[#64748b] capitalize">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {allUsers
                ?.filter(
                  (user: any) =>
                    user?.role === "student" &&
                    joinedAcademyDetails[0]?.academyMembers?.some(
                      (member: any) => member?.id === user?.id
                    )
                )
                .map((user: any) => (
                  <tr
                    key={user?.id}
                    // onClick={() => {
                    //   handleUserDetails(user?.id);
                    //   setModal1Open(true);
                    // }}
                    className="bg-white transition-all duration-500 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {user?.id}
                    </td>
                    <td className="px-5 py-3">
                      <div className="w-48 flex items-center gap-3">
                        <img
                          src={
                            user?.photoURL
                              ? user?.photoURL
                              : "https://github.com/shadcn.png"
                          }
                          alt="Floyd"
                          className="w-10 h-10 rounded-full object-center object-cover"
                        />
                        <div className="data">
                          <p className="font-normal text-sm text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="font-normal text-xs leading-5 text-gray-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 whitespace-nowrap">
                      <td className="p-5 whitespace-nowrap">
                        <div
                          className={
                            user?.role === "teacher"
                              ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 flex w-fit items-center gap-1 py-[1px] px-[10px] rounded-full"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 flex w-fit items-center gap-1 py-[1px] px-[10px] rounded-full"
                          }
                        >
                          {user?.role === "teacher" ? (
                            <GraduationCap className="h-3 w-3 mr-1" />
                          ) : (
                            <BookOpen className="h-3 w-3 mr-1" />
                          )}
                          <p className="!text-[10px] font-bold">
                            {user?.role === "teacher" ? "Teacher" : "Student"}
                          </p>
                        </div>
                      </td>
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {moment(user?.createdAt).format("MMMM D, YYYY")}
                    </td>

                    {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                    $18,500
                                  </td> */}
                    {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                    United States
                                  </td> */}
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                        <span className="font-medium text-xs text-emerald-600">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {user?.gender ? user?.gender : "n/a"}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {user?.contactNo ? user?.contactNo : "n/a"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Students;
