import { User } from "@/state/userStore.type";
import api from "@/utils/api";

const fetchUsers = async (): Promise<User[]> => {
  const userList = await api.get("/user/all");

  return userList.data;
};

export default {
  fetchUsers,
};
