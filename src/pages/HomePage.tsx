import { NavBar } from "@/features/navBar";
import { Posts, PostUploader } from "@/features/posts";
import { SponsorCard } from "@/features/sponsors";
import { FriendsCard, UserCard } from "@/features/user";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-12">
      <NavBar />

      <div className="grid flex-1 grid-cols-8 px-6 xl:px-20 mt-7">
        <div className="col-span-2 pr-2 xl:pr-5">
          <UserCard />
        </div>
        <div className="col-span-4 px-2 xl:px-5">
          <PostUploader />

          <div className="mt-10">
            <Posts />
          </div>
        </div>
        <div className="flex flex-col col-span-2 pl-2 xl:pl-5 gap-7">
          <SponsorCard />

          <FriendsCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
