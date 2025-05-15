import { User } from "@/state/userStore.type";
import api from "@/utils/api";

const fetchUserById = async (): Promise<User> => {
  const user = await api.get(`/user/me`);

  return user.data;
};

const addFriendBydId = async (idFriend: string) => {
  await api.post(`/user/me-friends/${idFriend}`);
};

export default {
  fetchUserById,
  addFriendBydId,
};
