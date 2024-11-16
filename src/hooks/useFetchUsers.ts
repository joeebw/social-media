import { useQuery } from "@tanstack/react-query";
import userService from "../features/navBar/services/userService";
import useGetUserData from "./useGetUserData";

const useFetchUsers = () => {
  const { data: userData } = useGetUserData();

  const getUsers = async () => {
    try {
      const userList = await userService.fetchUsers();

      const filteredUserList = userList.filter(
        (user) => user.id !== userData?.id
      );

      return filteredUserList;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["users", userData?.id],
    queryFn: getUsers,
    enabled: !!(userData && userData.id),
  });
};

export default useFetchUsers;
