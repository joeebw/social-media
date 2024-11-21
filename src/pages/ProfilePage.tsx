import { NavBar } from "@/features/navBar";
import { Posts, PostUploader } from "@/features/posts";
import { SponsorCard } from "@/features/sponsors";
import { FriendsCard, UserCard } from "@/features/user";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-12">
      <NavBar />

      <div className="flex flex-col flex-1 w-full gap-8 mx-auto sm:w-5/6 lg:gap-0 lg:w-full lg:grid lg:grid-cols-6 lg:px-20 2xl:px-60 mt-7">
        <div className="flex-col hidden gap-8 lg:flex lg:col-span-2 lg:pr-5">
          <UserCard />
          <FriendsCard />
          <SponsorCard />
        </div>

        <div className="lg:hidden">
          <UserCard />
        </div>

        <div className="lg:col-span-4 lg:pl-5">
          <PostUploader />

          <div className="mt-8 lg:mt-10">
            <Posts />
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:hidden">
          <SponsorCard />

          <FriendsCard />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
