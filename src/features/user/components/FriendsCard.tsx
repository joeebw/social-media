import AvatarProfile from "@/components/AvatarProfile";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import useFormattedFriendList from "../hooks/useFormattedFriendList";
import AddAndRemoveFriends from "./AddAndRemoveFriends";
import useAppStore from "@/state/useStore";
import { Link } from "react-router-dom";

const FriendsCard = () => {
  const myUserId = useAppStore((state) => state.idUser);
  const { friendList } = useFormattedFriendList();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 max-h-[11rem] overflow-y-auto">
        {friendList.map(
          ({
            profilePicture,
            firstName,
            lastName,
            occupation,
            id,
            isMyFriend,
          }) => (
            <div
              className="flex flex-row items-center justify-between"
              key={id}
            >
              <div className="flex items-center gap-2">
                <Link to={`/home/${id}`}>
                  <AvatarProfile
                    className="w-[3.5rem] h-[3.5rem]"
                    profilePicture={profilePicture.url}
                    alt={"profile picture"}
                  />
                </Link>

                <div className="flex flex-col">
                  <Link to={`/home/${id}`}>
                    <span className="font-medium">{`${firstName} ${lastName}`}</span>
                  </Link>
                  <span className="text-sm text-gray-400 bg-">
                    {occupation}
                  </span>
                </div>
              </div>

              {myUserId !== id && (
                <AddAndRemoveFriends friendId={id} isMyFriend={isMyFriend} />
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default FriendsCard;
