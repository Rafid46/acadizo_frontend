/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import useCurrentUser from "../hooks/useCurrentUser";
import useAcademies from "../hooks/useAcademies";
import useCurrentAcademy from "../hooks/useCurrentAcademy";
import InstitutionTable from "./Institution/InstitutionTable";
import BannerPart from "./Institution/BannerPart";
import JoinAcademyModal from "./Institution/JoinAcademyModal";
import CreateAcademyModal from "./Institution/CreateAcademyModal";
const InstitutionSection = () => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [academyModal, setAcademyModal] = useState(false);
  const [searchItem, setSearchItem] = useState(" ");
  const [joinedAcademyDetails, setJoinedAcademyDetails] = useState<any[]>([]);
  // const [isListLoading, setIsListLoading] = useState(true);
  // const queryClient = useQueryClient();

  // const axiosPublic = useAxios();
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const { users }: any = useUser();
  const { data: currentUser }: any = useCurrentUser();
  console.log(currentUser, "current userrrr");
  const { data: academyLists, isPending: isListLoading }: any = useAcademies();
  const { currentAcademy }: any = useCurrentAcademy();
  console.log(JSON.stringify(currentUser, null, 2), "testing current user");
  console.log(academyLists, "academy list");
  console.log(currentAcademy, "current academy");
  // console.log(currentUser, "current userrrr");
  // const { Option } = Select;
  // const { Option } = Select;
  const {
    // createUser,
    // updateUserProfile,
    // googleSignIn,
    loading,
  }: // setLoading,
  // logOut,

  any = useContext(AuthContext);

  // const currentUserEmail = currentUser?.find(
  //   (item: { email: string; id: string }) => item?.email === user?.email
  // )?.email;
  // const currentUserFirstName = currentUser?.find(
  //   (item: { email: string; id: string }) => item?.email === user?.email
  // )?.firstName;
  // const currentUserLastName = currentUser?.find(
  //   (item: { email: string; id: string }) => item?.email === user?.email
  // )?.lastName;
  // // console.log("current user -->", currentUser);
  // const currentUserId = currentUser?.find(
  //   (item: { email: string; id: string }) => item?.email === user?.email
  // )?.id;
  // const currentUserRole = currentUser?.find(
  //   (item: { email: string; id: string }) => item?.email === user?.email
  // )?.role;
  const currentUserEmail = currentUser?.email;
  const currentUserFirstName = currentUser?.firstName;
  const currentUserLastName = currentUser?.lastName;
  const currentUserId = currentUser?.id;
  const currentUserRole = currentUser?.role;
  const currentUserPhotoURL = currentUser?.photoURL;
  const userId = currentUserId;
  console.log("current user -->", currentUser?.email);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  // useEffect(() => {
  //   setIsListLoading(true);
  //   const getAcademyList = async () => {
  //     try {
  //       const res = await axiosPublic.get("/academy/academyList");
  //       console.log("academy list", res.data.data);
  //       setAcademyList(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsListLoading(false);
  //   };
  //   getAcademyList();
  // }, []);

  // join academy
  // const handleJoinAcademy = async (academyName: string) => {
  //   try {
  //     const userId = currentUserId;
  //     const email = currentUserEmail;
  //     const role = currentUserRole;
  //     const res = await axiosPublic.post("/api/v1/user/join-academy", {
  //       userId,
  //       academyName,
  //       email,
  //       role,
  //     });
  //     console.log(res.data);
  //     notification.success({
  //       message: <p className="font-semibold text-[14px]">Joined</p>,
  //       description: (
  //         <p className="text-[12px] text-gray-600">
  //           Joined academy successfully
  //         </p>
  //       ),
  //       duration: 3,
  //       placement: "topRight",
  //       showProgress: true,
  //     });
  //   } catch (error) {
  //     notification.error({
  //       message: <p className="font-semibold text-[14px]"></p>,
  //       description: (
  //         <p className="text-[12px] text-gray-600">Something went wrong</p>
  //       ),
  //       duration: 3,
  //       placement: "topRight",
  //       showProgress: true,
  //     });

  //     console.log(error);
  //   }
  // };

  // join academy

  // academy members
  // const academyMembers = () => {
  //   const academyMember =
  //     academyLists?.academyMembers?.map((item: any) => ({
  //       id: item?.id,
  //       email: item?.email,
  //       role: item?.role,
  //     })) || [];
  //   return academyMember;
  // };

  // const getEmail = academyLists?.flatMap((academy: any) =>
  //   academy?.academyMembers?.map((member: any) => member?.email)
  // );
  // console.log(getEmail);
  // const joinedAcademyDetails = getEmail?.map((item: any) => {
  //   return item?.email === currentUser?.email;
  // });

  // console.log(joinedAcademyDetails);
  // const joinedAcademyDetails = currentAcademy?.academyMembers?.find(
  //   (item: any) => item?.email === currentUser?.academyName
  // );

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
  console.log(joinedAcademyDetails, "joined academy");

  // const members = academyMembers();
  // useEffect(() => {
  //   if (academyList?.academyMembers) {
  //     console.log(academyMembers());
  //   }
  // }, [academyList]);

  // leave academy
  return (
    <section>
      <BannerPart joinedAcademyDetails={joinedAcademyDetails} />
      <InstitutionTable
        setAcademyModal={setAcademyModal}
        setCreateUserModal={setCreateUserModal}
        loading={loading}
        members={joinedAcademyDetails}
      />
      {currentUser?.role === "teacher" && (
        <CreateAcademyModal
          createUserModal={createUserModal}
          setCreateUserModal={setCreateUserModal}
          loading={loading}
        />
      )}
      <JoinAcademyModal
        joinedAcademyDetails={joinedAcademyDetails}
        userId={userId}
        academyModal={academyModal}
        setAcademyModal={setAcademyModal}
        searchItem={searchItem}
        handleSearch={handleSearch}
        isListLoading={isListLoading}
        loading={loading}
        academyLists={academyLists}
        currentUserEmail={currentUserEmail}
        currentUserId={currentUserId}
        currentUserFirstName={currentUserFirstName}
        currentUserLastName={currentUserLastName}
        currentUserRole={currentUserRole}
        currentUserPhotoURL={currentUserPhotoURL}
      />
    </section>
  );
};

export default InstitutionSection;
