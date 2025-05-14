import { User } from "@/state/userStore.type";
import api from "@/utils/api";

const fetchUserById = async (): Promise<User> => {
  const user = await api.get(`/user/me`);

  return user.data;
};

export default {
  fetchUserById,
};
