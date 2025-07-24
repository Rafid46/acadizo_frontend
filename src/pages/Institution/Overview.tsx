/* eslint-disable @typescript-eslint/no-explicit-any */
import InstitutionSection from "../InstitutionSection";

const Overview = () => {
  // const { data: currentUser }: any = useCurrentUser();
  // // console.log(currentUser, "hi");
  // const [academyModal, setAcademyModal] = useState(false);
  // const [searchItem, setSearchItem] = useState("");
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchItem(e.target.value);
  // };
  // const queryClient = useQueryClient();
  // const axiosPublic = useAxios();
  // const { data: academyLists, isPending: isListLoading }: any = useAcademies();
  // const currentUserEmail = currentUser?.email;
  // const currentUserFirstName = currentUser?.firstName;
  // const currentUserLastName = currentUser?.lastName;
  // const currentUserId = currentUser?.id;
  // const currentUserRole = currentUser?.role;
  // const currentUserPhotoURL = currentUser?.photoURL;
  // const userId = currentUserId;

  // const getJoinButton = (academy: any) => {
  //   const isUserEmailIncluded = academy?.academyMembers?.some(
  //     (member: any) => member?.email === currentUserEmail
  //   );
  //   const joinedAcademyDetails = academyLists?.some((academy: any) =>
  //     academy?.academyMembers?.some(
  //       (member: any) => member?.email === currentUserEmail
  //     )
  //   );

  //   return (
  //     <>
  //       {isUserEmailIncluded ? (
  //         <Popconfirm
  //           title="Leave academy"
  //           description={
  //             <p className="text-sm">
  //               Are you sure you want to left the academy?
  //             </p>
  //           }
  //           okText={
  //             <div
  //               className="p-5"
  //               onClick={() => handleLeaveAcademy(academy?.academyName, userId)}
  //             >
  //               Yes
  //             </div>
  //           }
  //           cancelText="No"
  //         >
  //           <Button
  //             className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color`}
  //           >
  //             Leave
  //           </Button>
  //         </Popconfirm>
  //       ) : (
  //         <Tooltip
  //           title={
  //             joinedAcademyDetails && (
  //               <p className="text-[12px]">
  //                 Leave your current academy to join a new academy
  //               </p>
  //             )
  //           }
  //         >
  //           <Button
  //             loading={
  //               isListLoading === academy?.academyId ||
  //               isPending === academy?.academyId
  //             }
  //             disabled={
  //               isListLoading === academy?.academyId ||
  //               isPending === academy?.academyId ||
  //               joinedAcademyDetails
  //             }
  //             className={
  //               isUserEmailIncluded
  //                 ? "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
  //                 : "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
  //             }
  //             onClick={() =>
  //               handleJoinAcademy(academy?.academyName, academy?.academyId)
  //             }
  //           >
  //             {isListLoading === academy?.academyId ||
  //             isPending === academy?.academyId
  //               ? "joining"
  //               : "Join"}
  //           </Button>
  //         </Tooltip>
  //       )}
  //     </>
  //   );
  // };
  // const { mutate: handleJoinAcademy, isPending } = useMutation({
  //   mutationKey: ["academyJoin"],
  //   mutationFn: async (academyName: any) => {
  //     const userId = currentUserId;
  //     const email = currentUserEmail;
  //     const role = currentUserRole;
  //     const firstName = currentUserFirstName;
  //     const lastName = currentUserLastName;
  //     const photoURL = currentUserPhotoURL;
  //     return await axiosPublic.post("/api/v1/user/join-academy", {
  //       userId,
  //       academyName,
  //       email,
  //       role,
  //       firstName,
  //       lastName,
  //       photoURL,
  //     });
  //   },
  //   onSuccess: async () => {
  //     queryClient.invalidateQueries({ queryKey: ["academyLists"] });
  //     const showNotification = Toast({
  //       type: "success",
  //       message: "",
  //       description: "You have joined the academy",
  //     });
  //     showNotification();
  //     window.location.reload();
  //   },
  // });

  // // leave academy
  // const { mutate: handleLeaveAcademy } = useMutation({
  //   mutationKey: ["leaveAcademy"],
  //   mutationFn: async (academyName: string) => {
  //     const userId = currentUserId;
  //     return await axiosPublic.post("/api/v1/user/leave-academy", {
  //       userId,
  //       academyName,
  //     });
  //   },
  //   onSuccess: async () => {
  //     window.location.reload();
  //     queryClient.invalidateQueries({ queryKey: ["academyLists"] });
  //     const showNotification = Toast({
  //       type: "success",
  //       message: "",
  //       description: "You have left the academy",
  //     });
  //     showNotification();
  //   },
  // });
  return (
    <div>
      <InstitutionSection />
    </div>
  );
};

export default Overview;
