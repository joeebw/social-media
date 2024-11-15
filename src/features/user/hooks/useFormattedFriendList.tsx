import useAppStore from "@/state/useStore";
import { useEffect, useState } from "react";
import useFetchUsers from "@/hooks/useFetchUsers";
import { FriendList } from "../ts/friends.type";

const useFormattedFriendList = () => {
  const [friendList, setFriendList] = useState<FriendList[]>([]);
  const usersFriendIdList = useAppStore((state) => state.user?.friends);

  const { data: userList } = useFetchUsers();

  const formmatedFriendList = async () => {
    if (!userList) return;

    const newFriendList = userList.map((user) => {
      return {
        ...user,
        isMyFriend: usersFriendIdList?.includes(user.id) ?? false,
      };
    });

    setFriendList(newFriendList);
  };

  useEffect(() => {
    formmatedFriendList();
  }, [usersFriendIdList, userList]);

  return { friendList };
};

export default useFormattedFriendList;
