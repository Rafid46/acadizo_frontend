/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, Modal, Popconfirm, Tooltip } from "antd";
import useCurrentUser from "../../hooks/useCurrentUser";
import InstitutionSection from "../InstitutionSection";
import Loader from "../../common/Loader";
import { useContext, useState } from "react";
import Toast from "../../common/Toast";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAcademies from "../../hooks/useAcademies";
import { AuthContext } from "../../providers/AuthProvider";
import { PiStudent } from "react-icons/pi";

const Overview = () => {
  const { data: currentUser }: any = useCurrentUser();
  const [academyModal, setAcademyModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const { data: academyLists, isPending: isListLoading }: any = useAcademies();
  const { loading }: any = useContext(AuthContext);
  const currentUserEmail = currentUser?.email;
  const currentUserFirstName = currentUser?.firstName;
  const currentUserLastName = currentUser?.lastName;
  const currentUserId = currentUser?.id;
  const currentUserRole = currentUser?.role;
  const currentUserPhotoURL = currentUser?.photoURL;
  const userId = currentUserId;

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
    );
  };
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
      window.location.reload();
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
      window.location.reload();
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
      {currentUser?.academyName === null ||
      undefined ||
      "" ||
      !currentUser?.academyName?.trim() ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-md text-center  border border-gray-200 rounded-lg py-8 px-10">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                Join an Academy
              </div>
              <div className="text-gray-600 mt-2">
                Unlock a world of knowledge and connect with fellow learners.
                Click below to get started on your educational journey!
              </div>
            </div>
            <div className="flex justify-center p-6">
              <Button
                onClick={() => setAcademyModal(true)}
                icon={<PiStudent />}
                // disabled={isButtonDisabled || loading}
                // loading={loading}
                htmlType="submit"
                style={{
                  transition: "background-color 0.3s ease",
                }}
                type="primary"
                className={`text-sm font-semibold h-[40px] px-8 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-gray-200`}
              >
                Join academy
              </Button>
            </div>
          </div>
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
                          <p className="text-sm">
                            {academy.academyDescription}
                          </p>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </Modal>
        </div>
      ) : (
        <InstitutionSection />
      )}
    </div>
  );
};

export default Overview;
