import { NavBar } from "@/features/navBar";
import { Posts, PostUploader } from "@/features/posts";
import { SponsorCard } from "@/features/sponsors";
import { FriendsCard, UserCard } from "@/features/user";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-12">
      <NavBar />

      <div className="flex flex-col flex-1 w-11/12 gap-8 mx-auto sm:w-5/6 lg:gap-0 lg:w-full lg:grid lg:grid-cols-8 lg:px-6 2xl:px-20 mt-7">
        <div className="lg:col-span-2 lg:pr-2 2xl:pr-5">
          <UserCard />
        </div>
        <div className="lg:col-span-4 lg:px-2 2xl:px-5">
          <PostUploader />

          <div className="mt-8 lg:mt-10">
            <Posts />
          </div>
        </div>
        <div className="flex flex-col gap-8 pl-2 lg:col-span-2 2xl:pl-5 lg:gap-7">
          <SponsorCard />

          <FriendsCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
