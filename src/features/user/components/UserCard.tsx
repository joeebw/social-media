import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineLocationOn, MdOutlineEdit } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { TbBriefcase2 } from "react-icons/tb";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import AvatarProfile from "@/components/AvatarProfile";
import useGetUserData from "@/hooks/useGetUserData";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";

const UserCard = () => {
  const { data: userData, isLoading } = useGetUserData();
  const { id } = useParams();
  const friends = userData?.friends;
  const name = userData ? `${userData.firstName} ${userData.lastName}` : "";

  return (
    <div>
      <Card className="bg-secondaryBackground">
        <IconContext.Provider value={{ size: "1.6rem" }}>
          <CardContent className="pt-4 text-sm text-gray-500">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {id ? (
                  <UserProfileModal profileUrl={userData?.profilePicture.url}>
                    <AvatarProfile
                      className="w-[3.5rem] h-[3.5rem] cursor-pointer"
                      profilePicture={userData?.profilePicture.url}
                      alt="profile picture"
                    />
                  </UserProfileModal>
                ) : (
                  <Link to={`/home/${userData?.id}`}>
                    <AvatarProfile
                      className="w-[3.5rem] h-[3.5rem]"
                      profilePicture={userData?.profilePicture.url}
                      alt={"profile picture"}
                    />
                  </Link>
                )}

                <div className="flex justify-between">
                  <div>
                    {isLoading ? (
                      <>
                        <Skeleton className="w-32 h-6 mb-2" />
                        <Skeleton className="w-20 h-4" />
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <span className="text-sm text-gray-400">
                          {friends?.length === 0
                            ? "No Friends"
                            : friends?.length === 1
                            ? "1 Friend"
                            : `${friends?.length} Friends`}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <IconContext.Provider value={{ size: "1.1rem" }}>
                <RiUserSettingsLine className="text-gray-600 cursor-not-allowed" />
              </IconContext.Provider>
            </div>

            <Separator className="my-3 bg-gray-300" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <MdOutlineLocationOn className="text-gray-700" />
                {isLoading ? (
                  <Skeleton className="w-24 h-4" />
                ) : (
                  <span>{userData?.location}</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <TbBriefcase2 className="text-gray-700" />
                {isLoading ? (
                  <Skeleton className="w-32 h-4" />
                ) : (
                  <span>{userData?.occupation}</span>
                )}
              </div>
            </div>

            <Separator className="my-3 bg-gray-300" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <span>Who's viewed your profile</span>
                <span className="font-medium text-gray-600">
                  {Math.floor(Math.random() * 1000) + 1}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Impressions of your post</span>
                <span className="font-medium text-gray-600">
                  {Math.floor(Math.random() * 1000) + 1}
                </span>
              </div>
            </div>

            <Separator className="my-3 bg-gray-300" />

            <div>
              <h4 className="font-medium text-gray-600">Social Profile</h4>

              <div className="flex flex-col gap-3 mt-3">
                <div className="flex items-center gap-3 text-sm">
                  <FaTwitter className="text-gray-500" />
                  <div className="flex justify-between flex-1">
                    <div className="flex flex-col">
                      <span className="font-bold">Twitter</span>
                      <span>Social Network</span>
                    </div>
                    <MdOutlineEdit className="text-gray-600 cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <FaLinkedin className="text-gray-500" />
                  <div className="flex justify-between flex-1">
                    <div className="flex flex-col">
                      <span className="font-bold">Twitter</span>
                      <span>Social Network</span>
                    </div>
                    <MdOutlineEdit className="text-gray-600 cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </IconContext.Provider>
      </Card>
    </div>
  );
};

export default UserCard;
