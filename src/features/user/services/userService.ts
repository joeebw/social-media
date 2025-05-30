import { User } from "@/state/userStore.type";
import api from "@/utils/api";

const fetchUserById = async (id: string): Promise<User> => {
  const user = await api.get(`/user/me/${id}`);

  return user.data;
};

const addFriendBydId = async (idFriend: string) => {
  await api.post(`/user/me-friends/${idFriend}`);
};

export default {
  fetchUserById,
  addFriendBydId,
};
