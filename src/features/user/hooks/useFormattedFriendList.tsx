import { useEffect, useState } from "react";
import useFetchUsers from "@/hooks/useFetchUsers";
import { FriendList } from "../ts/friends.type";
import useGetUserData from "@/hooks/useGetUserData";

const useFormattedFriendList = () => {
  const [friendList, setFriendList] = useState<FriendList[]>([]);
  const { data: userList } = useFetchUsers();
  const { data: userData } = useGetUserData();

  const usersFriendIdList = userData?.friends;

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
