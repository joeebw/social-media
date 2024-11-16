import { fetchUserList } from "@/utils/firebase";

const fetchUsers = async () => {
  const userList = await fetchUserList();

  if (!userList) {
    throw new Error("userList not found");
  }

  return userList;
};

export default {
  fetchUsers,
};
