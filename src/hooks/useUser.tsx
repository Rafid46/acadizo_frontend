/* eslint-disable @typescript-eslint/no-explicit-any */
import useAllUser from "./useAllUser";

const useUser = () => {
  const [AllUserInfo]: any = useAllUser();
  const users = AllUserInfo?.map((user: any) => {
    return user;
  });
  console.log(users);
  return { users };
};

export default useUser;
