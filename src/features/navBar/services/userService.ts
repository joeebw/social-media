import { fetchUserById, fetchUserList } from "@/utils/firebase";

const fetchUsers = async () => {
  const userList = await fetchUserList();

  if (!userList) {
    throw new Error("userList not found");
  }

  return userList;
};

const fetchUser = async (id: string) => {
  const user = await fetchUserById(id);
  return user;
};

export default {
  fetchUsers,
  fetchUser,
};
