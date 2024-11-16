import { IconContext } from "react-icons/lib";
import { TiUserAddOutline } from "react-icons/ti";
import { HiOutlineUserRemove } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { updateUserFriends } from "@/utils/firebase";
import { toast } from "sonner";
import { useState } from "react";
import useGetUserData from "@/hooks/useGetUserData";
import { useQueryClient } from "@tanstack/react-query";
import useAppStore from "@/state/useStore";

type Props = {
  isMyFriend: boolean;
  friendId: string;
};

const AddAndRemoveFriends = ({ isMyFriend, friendId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useGetUserData(true);
  const myUserId = useAppStore((state) => state.idUser);
  const queryClient = useQueryClient();

  const userFriendList = currentUser?.friends;

  const addFriend = async (idFriend: string) => {
    try {
      setIsLoading(true);
      const newUserFriendList = [...(userFriendList as string[]), idFriend];
      await updateUserFriends(currentUser?.id as string, newUserFriendList);
      queryClient.invalidateQueries({ queryKey: ["user", myUserId] });
    } catch (error) {
      toast.error("Oops! Can't add new friend, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFriend = async (idFriend: string) => {
    try {
      setIsLoading(true);
      const filteredUserFriendList = userFriendList!.filter(
        (id) => id !== idFriend
      );
      await updateUserFriends(
        currentUser?.id as string,
        filteredUserFriendList
      );
      queryClient.invalidateQueries({ queryKey: ["user", myUserId] });
    } catch (error) {
      toast.error("Oops! Can't remove friend, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IconContext.Provider value={{ className: "text-cyan-500" }}>
      {isMyFriend ? (
        <Button
          variant={"ghost"}
          size="icon"
          className="rounded-full bg-cyan-100"
          onClick={() => removeFriend(friendId)}
          disabled={isLoading}
        >
          <HiOutlineUserRemove />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          size="icon"
          className="rounded-full bg-cyan-100"
          onClick={() => addFriend(friendId)}
          disabled={isLoading}
        >
          <TiUserAddOutline />
        </Button>
      )}
    </IconContext.Provider>
  );
};

export default AddAndRemoveFriends;
