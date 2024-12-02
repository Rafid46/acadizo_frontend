/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import useAxios from "../hooks/useAxios";
import useUser from "../hooks/useUser";
import useCurrentUser from "../hooks/useCurrentUser";
import useAcademies from "../hooks/useAcademies";
import useCurrentAcademy from "../hooks/useCurrentAcademy";
import InstitutionTable from "./Institution/InstitutionTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BannerPart from "./Institution/BannerPart";
import JoinAcademyModal from "./Institution/JoinAcademyModal";
import CreateAcademyModal from "./Institution/CreateAcademyModal";
const InstitutionSection = () => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [academyModal, setAcademyModal] = useState(false);
  const [academyList, setAcademyList] = useState<any[]>([]);
  const [searchItem, setSearchItem] = useState(" ");
  // const [isListLoading, setIsListLoading] = useState(true);
  const queryClient = useQueryClient();

  const axiosPublic = useAxios();
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { users }: any = useUser();
  const { currentUser }: any = useCurrentUser();
  const { data: academyLists, isPending: isListLoading }: any = useAcademies();
  const {
    currentAcademy,
    refetch: academyRefetch,
    isLoading: academyLoading,
  }: any = useCurrentAcademy();
  console.log(currentUser, "testing current user");
  console.log(academyLists, "academy list");
  console.log(currentAcademy, "current academy");
  // const { Option } = Select;
  // const { Option } = Select;
  const {
    // createUser,
    // updateUserProfile,
    // googleSignIn,
    loading,
    // setLoading,
    // logOut,
    user,
  }: any = useContext(AuthContext);

  const currentUserEmail = users?.find(
    (item: { email: string; id: string }) => item?.email === user?.email
  )?.email;
  const currentUserFirstName = users?.find(
    (item: { email: string; id: string }) => item?.email === user?.email
  )?.firstName;
  const currentUserLastName = users?.find(
    (item: { email: string; id: string }) => item?.email === user?.email
  )?.lastName;
  // console.log("current user -->", currentUser);
  const currentUserId = users?.find(
    (item: { email: string; id: string }) => item?.email === user?.email
  )?.id;
  const currentUserRole = users?.find(
    (item: { email: string; id: string }) => item?.email === user?.email
  )?.role;

  const ifUserExistInAcademy = () => {
    academyList?.find((item) => item?.email === currentUserEmail);
  };
  console.log(ifUserExistInAcademy, "email show koro");
  // console.log("current user id -->", currentUserId);

  // const matchUser = (email: any) => {
  //   const user = users.find((user: any) => user?.email === email);
  //   return user;
  // };

  // const handleRegister = async (values: any) => {
  //   const { email, password, first_name, last_name } = values;
  //   await updateUserProfile(`${first_name} ${last_name}`);
  //   console.log("Registering with values:", values);

  //   createUser(email, password)
  //     .then((res: any) => {
  //       console.log("User created in Firebase:", res.data);

  //       const loggedInUser = res.user; // Firebase user data

  //       console.log("Logged in user:", loggedInUser);
  //       const userData = {
  //         ...values,
  //         role: "teacher",
  //         firstName: values.first_name,
  //         lastName: values.last_name,
  //       };

  //       console.log("User data being sent to the backend:", userData);
  //       return axiosPublic.post("/api/v1/user/create-user", userData);
  //     })
  //     .then((response: any) => {
  //       notification.success({
  //         message: "Registration success",
  //         description: "Account registered successfully",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       console.log("User data saved to MongoDB:", response.data);
  //     })
  //     .catch((error: any) => {
  //       notification.error({
  //         message: "Something went wrong",
  //         description: "registration failed",
  //         duration: 3,
  //         placement: "topRight",
  //       });
  //       console.log("Error during registration:", error);
  //     });
  //   // const userdata = {
  //   //   ...values,
  //   //   role: "student",
  //   //   firstName: values.first_name,
  //   //   lastName: values.last_name,
  //   // };
  //   // axiosPublic
  //   //   .post("api/v1/user/create-user", userdata)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // };
  // const handleRegister = async (values: any) => {
  //   try {
  //     const { email, password, first_name, last_name, role } = values;
  //     const name = `${first_name} ${last_name}`;

  //     // Check if user already exists in your backend
  //     // const users = await axiosPublic.get("/api/v1/users");
  //     // const matchUser = users.data.find((user: any) => user.email === email);
  //     // if (matchUser) {
  //     //   notification.error({
  //     //     message: "Email already exists",
  //     //     description:
  //     //       "The provided email is already registered. Please use another email.",
  //     //     duration: 3,
  //     //     placement: "topRight",
  //     //   });
  //     //   return;
  //     // }

  //     // Temporarily change Firebase Auth persistence to "none" for this operation
  //     await setPersistence(auth, browserLocalPersistence);

  //     // Create user in Firebase (does not persist session)
  //     const userCredential = await createUser(email, password);
  //     console.log("User created in Firebase:", userCredential.user);
  //     await logOut();
  //     // Prepare user data for MongoDB
  //     const userData = {
  //       first_name,
  //       last_name,
  //       email,
  //       role,
  //       displayName: name,
  //     };

  //     // Save user data to MongoDB
  //     const res = await axiosPublic.post("/api/v1/user/create-user", userData);
  //     console.log("User data saved to MongoDB:", res.data);

  //     // Notify user of success
  //     notification.success({
  //       message: "Registration success",
  //       description: "Account registered successfully. Please log in.",
  //       duration: 3,
  //       placement: "topRight",
  //     });

  //     // Optionally redirect the user to the login page
  //     // history.push('/login');
  //   } catch (error: any) {
  //     notification.error({
  //       message: "Registration failed",
  //       description: error.message || "An error occurred during registration",
  //       duration: 3,
  //       placement: "topRight",
  //     });
  //     console.error("Error during");
  //   }
  // };
  // const handleGoogleSignIn = () => {
  //   googleSignIn().then((result: any) => {
  //     console.log(result.user);

  //     const [firstName, ...rest] = result.user.displayName.split(" ");
  //     const lastName = rest.join(" ");

  //     const userInfo = {
  //       email: result.user?.email,
  //       firstName: firstName || "Unknown", // Default to avoid empty fields
  //       lastName: lastName || " ",
  //       role: "teacher",
  //     };

  //     axiosPublic
  //       .post("http://localhost:3000/api/v1/user/create-user", userInfo)
  //       .then((res: any) => {
  //         console.log(res.data);
  //       })
  //       .catch((error: any) => {
  //         console.error("Error saving user data:", error);
  //       });
  //   });
  // };

  // const onFieldsChange = (_: any, allFields: any) => {
  //   const isValid = allFields.every(
  //     (field: any) => field.errors.length === 0 && field.value
  //   );
  //   setIsButtonDisabled(!isValid);
  // };

  const handleCreateAcademy = async (values: any) => {
    const userEmail = user.email;
    try {
      console.log("form values", values);
      const res = await axiosPublic.post("/academy/createAcademy", {
        academyName: values?.academy_name,
        academyDescription: values?.academy_description,
        academyNumber: values?.academy_number,
        academyCreatedBy: userEmail,
      });
      notification.success({
        message: <p className="font-semibold text-[14px]">Success</p>,
        description: (
          <p className="text-[12px] text-gray-600">
            Academy created successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
      console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
      notification.error({
        message: <p className="font-semibold text-[14px]">Oops</p>,
        description: (
          <p className="text-[12px] text-gray-600">Something went wrong</p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
    }
  };

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
  const { mutate: handleJoinAcademy, isPending } = useMutation({
    mutationKey: ["academyJoin"],
    mutationFn: async (academyName: any) => {
      const userId = currentUserId;
      const email = currentUserEmail;
      const role = currentUserRole;
      const firstName = currentUserFirstName;
      const lastName = currentUserLastName;
      return await axiosPublic.post("/api/v1/user/join-academy", {
        userId,
        academyName,
        email,
        role,
        firstName,
        lastName,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["academyLists"] });
      notification.success({
        message: <p className="font-semibold text-[14px]">Joined</p>,
        description: (
          <p className="text-[12px] text-gray-600">
            Joined academy successfully
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
    },
  });

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
  const isMember = academyLists?.find(
    (item: any) => item?.email === user?.academyName
  );
  // const members = academyMembers();
  // useEffect(() => {
  //   if (academyList?.academyMembers) {
  //     console.log(academyMembers());
  //   }
  // }, [academyList]);

  return (
    <section>
      <BannerPart currentAcademy={isMember} />
      <InstitutionTable
        setAcademyModal={setAcademyModal}
        setCreateUserModal={setCreateUserModal}
        loading={loading}
        members={isMember}
      />
      <CreateAcademyModal
        createUserModal={createUserModal}
        setCreateUserModal={setCreateUserModal}
        handleCreateAcademy={handleCreateAcademy}
      />
      <JoinAcademyModal
        academyModal={academyModal}
        setAcademyModal={setAcademyModal}
        searchItem={searchItem}
        handleSearch={handleSearch}
        isListLoading={isListLoading}
        loading={loading}
        currentUserEmail={currentUserEmail}
        isPending={isPending}
        academyLists={academyLists}
        handleJoinAcademy={handleJoinAcademy}
      />
    </section>
  );
};

export default InstitutionSection;
