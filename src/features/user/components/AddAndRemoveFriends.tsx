import { TiUserAddOutline } from "react-icons/ti";
import { HiOutlineUserRemove } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAppStore from "@/state/useStore";
import userService from "@/features/user/services/userService";

type Props = {
  isMyFriend: boolean;
  friendId: string;
};

const AddAndRemoveFriends = ({ isMyFriend, friendId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const myUserId = useAppStore((state) => state.idUser);
  const queryClient = useQueryClient();

  const addAndRemoveFriends = async (idFriend: string) => {
    await userService.addFriendBydId(idFriend);
    queryClient.invalidateQueries({ queryKey: ["user", myUserId] });
  };

  const addFriend = async (idFriend: string) => {
    try {
      setIsLoading(true);
      await addAndRemoveFriends(idFriend);
    } catch (error) {
      toast.error("Oops! Can't add new friend, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFriend = async (idFriend: string) => {
    try {
      setIsLoading(true);
      await addAndRemoveFriends(idFriend);
    } catch (error) {
      toast.error("Oops! Can't remove friend, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMyFriend ? (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => removeFriend(friendId)}
          disabled={isLoading}
        >
          <HiOutlineUserRemove />
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => addFriend(friendId)}
          disabled={isLoading}
        >
          <TiUserAddOutline />
        </Button>
      )}
    </>
  );
};

export default AddAndRemoveFriends;
