/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, Modal, Popconfirm, Tooltip } from "antd";
import Loader from "../../common/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Toast from "../../common/Toast";

const JoinAcademyModal = ({
  academyModal,
  setAcademyModal,
  searchItem,
  handleSearch,
  isListLoading,
  loading,
  academyLists,
  currentUserEmail,
  currentUserId,
  currentUserFirstName,
  currentUserRole,
  currentUserLastName,
  userId,
  currentUserPhotoURL,
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
              className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color`}
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
                  ? "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
                  : "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
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
      queryClient.invalidateQueries({ queryKey: ["academyLists"] });
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
      queryClient.invalidateQueries({ queryKey: ["academyLists"] });
      const showNotification = Toast({
        type: "success",
        message: "",
        description: "You have left the academy",
      });
      showNotification();
    },
  });
  return (
    <div>
      <Modal
        footer={null}
        title="Choose & select or join your academy"
        centered
        open={academyModal}
        onOk={() => setAcademyModal(false)}
        onCancel={() => setAcademyModal(false)}
      >
        <div className="">
          <div className="relative my-5">
            <input
              placeholder="Search academy by name"
              value={searchItem}
              onChange={handleSearch}
              className="w-full input rounded-[12px] px-6 py-2 border focus:outline-none focus:border-primary-color placeholder-gray-400 transition-all duration-300 border-gray-200 placeholder:text-sm"
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
            <List
              className="max-h-[50vh] min-h-[50vh] overflow-y-scroll scroll-smooth"
              loading={loading}
              dataSource={academyLists?.filter(
                (academy: any) =>
                  academy?.academyName &&
                  academy?.academyName
                    .toLowerCase()
                    .includes(searchItem?.toLowerCase())
              )}
              renderItem={(academy: any) => (
                <List.Item actions={[getJoinButton(academy)]}>
                  <List.Item.Meta
                    title={
                      <p className="font-semibold">{academy.academyName}</p>
                    }
                    description={
                      <p className="text-sm">{academy.academyDescription}</p>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default JoinAcademyModal;
