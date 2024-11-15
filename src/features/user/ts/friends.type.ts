import { User } from "@/state/userStore.type";

export type FriendList = User & {
  isMyFriend: boolean;
};
