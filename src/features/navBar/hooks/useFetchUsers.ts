import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const getUsers = async () => {
  try {
    const userList = await userService.fetchUsers();
    return userList;
  } catch (error) {
    console.error(error);
  }
};

const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export default useFetchUsers;
