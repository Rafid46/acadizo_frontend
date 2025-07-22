/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Badge, Button, Modal, Popconfirm, Tooltip } from "antd";
import Loader from "../../common/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Toast from "../../common/Toast";
import {
  ArrowBigRightDash,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Users,
} from "lucide-react";
import { IoIosLogOut } from "react-icons/io";

const JoinAcademyModal = ({
  academyModal,
  setAcademyModal,
  searchItem,
  handleSearch,
  isListLoading,
  academyLists,
  currentUserEmail,
  currentUserId,
  currentUserFirstName,
  currentUserRole,
  currentUserLastName,
  userId,
  currentUserPhotoURL,
  refetch,
}: any) => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const getJoinButton = (academy: any) => {
    const isUserEmailIncluded = academy?.academyMembers?.some(
      (member: any) => member?.email === currentUserEmail
    );
    const joinedAcademyDetails = academyLists?.some((academy: any) =>
      academy?.academyMembers?.some(
        (member: any) => member?.email === currentUserEmail
      )
    );

    return (
      <>
        {isUserEmailIncluded ? (
          <Popconfirm
            title="Leave academy"
            description={
              <p className="text-sm">
                Are you sure you want to left the academy?
              </p>
            }
            okText={
              <div
                className="p-5"
                onClick={() => handleLeaveAcademy(academy?.academyName, userId)}
              >
                Yes
              </div>
            }
            cancelText="No"
          >
            <Button
              icon={<IoIosLogOut className="h-4 w-4" />}
              className={`text-sm font-semibold h-[30px] px-6 shadow-none !text-red-400 !bg-transparent border !border-red-400`}
            >
              Leave
            </Button>
          </Popconfirm>
        ) : (
          <Tooltip
            title={
              joinedAcademyDetails && (
                <p className="text-[12px]">
                  Leave your current academy to join a new academy
                </p>
              )
            }
          >
            <Button
              icon={<ArrowBigRightDash className="h-4 w-4" />}
              loading={
                isListLoading === academy?.academyId ||
                isPending === academy?.academyId
              }
              disabled={
                isListLoading === academy?.academyId ||
                isPending === academy?.academyId ||
                joinedAcademyDetails
              }
              className={
                isUserEmailIncluded
                  ? "text-sm font-semibold shadow-none text-secondary-color bg-transparent border"
                  : "text-sm font-semibold shadow-none text-secondary-color bg-transparent border"
              }
              onClick={() =>
                handleJoinAcademy(academy?.academyName, academy?.academyId)
              }
            >
              {isListLoading === academy?.academyId ||
              isPending === academy?.academyId
                ? "joining"
                : "Join"}
            </Button>
          </Tooltip>
        )}
      </>

      // <>
      //   {isListLoading || isPending ? (
      //     <>
      //       <Button
      //         disabled={isListLoading || isPending || isUserEmailIncluded}
      //         className={
      //           isUserEmailIncluded
      //             ? "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
      //             : "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color"
      //         }
      //       >
      //         joining..
      //       </Button>
      //     </>
      //   ) : isUserEmailIncluded ? (
      //     <>
      //       <Button
      //         disabled
      //         className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border`}
      //       >
      //         Joined
      //       </Button>
      //     </>
      //   ) : (
      //     <>
      //       <Button
      //         className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color`}
      //         onClick={() =>
      //           !isUserEmailIncluded && handleJoinAcademy(academy?.academyName)
      //         }
      //       >
      //         Join
      //       </Button>
      //     </>
      //   )}
      // </>
    );
  };

  // join a academy
  const { mutate: handleJoinAcademy, isPending } = useMutation({
    mutationKey: ["academyJoin"],
    mutationFn: async (academyName: any) => {
      const userId = currentUserId;
      const email = currentUserEmail;
      const role = currentUserRole;
      const firstName = currentUserFirstName;
      const lastName = currentUserLastName;
      const photoURL = currentUserPhotoURL;
      return await axiosPublic.post("/api/v1/user/join-academy", {
        userId,
        academyName,
        email,
        role,
        firstName,
        lastName,
        photoURL,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["allAcademies"] });
      setAcademyModal(false);
      const showNotification = Toast({
        type: "success",
        message: "",
        description: "You have joined the academy",
      });
      showNotification();
    },
  });

  // leave academy
  const { mutate: handleLeaveAcademy } = useMutation({
    mutationKey: ["leaveAcademy"],
    mutationFn: async (academyName: string) => {
      const userId = currentUserId;
      return await axiosPublic.post("/api/v1/user/leave-academy", {
        userId,
        academyName,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["allAcademies"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      refetch();
      setAcademyModal(false);
      const showNotification = Toast({
        type: "success",
        message: "",
        description: "You have left the academy",
      });
      showNotification();
    },
  });
  const data = academyLists?.filter(
    (academy: any) =>
      academy?.academyName &&
      academy?.academyName?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  console.log(data);
  return (
    <div>
      <Modal
        footer={null}
        title={
          <div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-[10px] bg-gradient-to-r  to-blue-400 from-teal-500 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                Choose & Select Academy
              </div>
              <p className="text-slate-600 text-sm">
                Join an academy to start your learning journey
              </p>
            </div>
          </div>
        }
        centered
        open={academyModal}
        onOk={() => setAcademyModal(false)}
        onCancel={() => setAcademyModal(false)}
      >
        <div className="">
          <div className="relative my-5">
            <input
              placeholder="Search academy by name..."
              value={searchItem}
              onChange={handleSearch}
              className="w-full rounded-[5px] px-6 py-2 border placeholder:text-sm focus:outline-none focus:border-primary-color transition-all duration-300 border-gray-200"
              type="text"
            />
            <button className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          {/* <Input
            placeholder="Search academy by name"
            value={searchItem}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: "300px" }}
          /> */}
          {isListLoading ? (
            <Loader />
          ) : (
            // <List
            //   className="max-h-[50vh] min-h-[50vh] overflow-y-scroll scroll-smooth"
            //   loading={loading}
            //   dataSource={academyLists?.filter(
            //     (academy: any) =>
            //       academy?.academyName &&
            //       academy?.academyName
            //         .toLowerCase()
            //         .includes(searchItem?.toLowerCase())
            //   )}
            //   renderItem={(academy: any) => (
            //     <List.Item actions={[getJoinButton(academy)]}>
            //       <List.Item.Meta
            //         title={
            //           <p className="font-semibold">{academy.academyName}</p>
            //         }
            //         description={
            //           <p className="text-sm">{academy.academyDescription}</p>
            //         }
            //       />
            //     </List.Item>
            //   )}
            // />
            <div>
              {academyLists
                ?.filter((item: any) =>
                  item?.academyName
                    ?.toLowerCase()
                    .includes(searchItem?.toLowerCase())
                )
                .map((item: any) => (
                  <div
                    key={item?.id}
                    className="border !border-gray-200 rounded-lg mb-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="">
                            <Avatar
                              size={70}
                              src={
                                item?.[0]?.academyLogoUrl || // Your image URL
                                undefined
                              }
                              className="flex items-center justify-center"
                              style={{
                                backgroundImage: `url("https://vercel.com/api/www/avatar/eb3qpvJHzzjxaYdU9mUIuAO9")`,
                              }}
                            >
                              {item?.academyName && (
                                <p className="text-gray-600 font-bold text-[20px]">
                                  {item.academyName.charAt(0).toUpperCase()}
                                </p>
                              )}
                            </Avatar>
                          </div>
                          {item?.isJoined === true && (
                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-slate-900 truncate">
                                  {item?.academyName}
                                </h3>
                                <Badge className="text-xs">
                                  {item?.category}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                {item?.academyDescription}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{item?.academyNumber} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  <span>Active</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              {getJoinButton(item)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default JoinAcademyModal;
