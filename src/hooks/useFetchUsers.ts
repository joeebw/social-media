import { useQuery } from "@tanstack/react-query";
import userService from "../features/navBar/services/userService";
import useAppStore from "@/state/useStore";

const useFetchUsers = () => {
  const currentUserId = useAppStore((state) => state.idUser);

  const getUsers = async () => {
    try {
      const userList = await userService.fetchUsers();

      const filteredUserList = userList.filter(
        (user) => user.id !== currentUserId
      );

      return filteredUserList;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export default useFetchUsers;
