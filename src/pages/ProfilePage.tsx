import { NavBar } from "@/features/navBar";
import { Posts, PostUploader } from "@/features/posts";
import { SponsorCard } from "@/features/sponsors";
import { FriendsCard, UserCard } from "@/features/user";
import useAppStore from "@/state/useStore";
import clsx from "clsx";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const myUserId = useAppStore((state) => state.idUser);

  return (
    <div className="flex flex-col w-full min-h-screen pb-12">
      <NavBar />

      <div className="grid flex-1 w-[65%] grid-cols-6 mx-auto mt-7">
        <div className="flex flex-col col-span-2 gap-8 pr-5">
          <UserCard />
          <FriendsCard />
          <SponsorCard />
        </div>
        <div className="col-span-4 px-5">
          <PostUploader />

          <div className={clsx(id === myUserId && "mt-10")}>
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
