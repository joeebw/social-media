import AvatarProfile from "@/components/AvatarProfile";
import DropdownDelete from "@/components/DropdownDelete";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Post as PostType } from "@/ts/post.types";
import timeAgo from "@/utils/timeAgo";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostActions from "../hooks/usePostActions";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import LikesPost from "./LikesPost";
import AddAndRemoveFriends from "@/features/user/components/AddAndRemoveFriends";
import useGetUserData from "@/hooks/useGetUserData";
import LoadingButton from "@/components/LoadingButton";

type Props = {
  postItem: PostType;
};

const MAX_CHARACTERS = 100;

const commentSchema = z.object({
  comment: z
    .string()
    .max(MAX_CHARACTERS, `Comment cannot exceed ${MAX_CHARACTERS} characters`),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

const Post = ({ postItem }: Props) => {
  const {
    firstName,
    lastName,
    datePost,
    description,
    picturePath,
    userPicturePath,
    comments,
    likes,
    userId: userPostId,
  } = postItem;
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const { data: myUser } = useGetUserData(true);

  const {
    handleCreateComment,
    handleDeleteComment,
    handleDeletePost,
    handleSelectUser,
  } = usePostActions(comments);
  const name = `${firstName} ${lastName}`;
  const timeAgoPost = timeAgo(datePost);

  const usersFriendIdList = myUser?.friends;
  const isMyFriend = usersFriendIdList?.includes(userPostId) ?? false;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    mode: "onSubmit",
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between ">
        <div className="flex gap-4">
          <AvatarProfile
            profilePicture={userPicturePath}
            alt="profile picture"
            className="cursor-pointer"
            onClick={() => handleSelectUser(userPostId)}
          />
          <div className="flex flex-col">
            <p
              className="text-sm font-semibold transition cursor-pointer hover:text-primary"
              onClick={() => handleSelectUser(userPostId)}
            >
              {name}
            </p>
            <p className="text-xs text-muted-foreground">{timeAgoPost}</p>
          </div>
        </div>

        {myUser?.id === userPostId ? (
          <DropdownDelete
            isLoading={isDeletingPost}
            onDelete={() => handleDeletePost(postItem.id, setIsDeletingPost)}
          />
        ) : (
          <AddAndRemoveFriends friendId={userPostId} isMyFriend={isMyFriend} />
        )}
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <p className="px-4 text-base sm:px-0">{description}</p>

        {picturePath && (
          <ImageWithSkeleton
            src={picturePath}
            alt="post image"
            containerClassName="w-full mt-4 h-[550px] sm:h-[700px]"
            className="absolute object-cover w-full h-full rounded-lg"
          />
        )}
      </CardContent>
      <CardFooter className="block">
        <div className="flex items-center gap-7">
          <LikesPost likes={likes} postId={postItem.id} />

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-muted"
            onClick={() => setIsOpenComments(!isOpenComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>
              {comments.length === 0
                ? "No comments"
                : comments.length === 1
                ? "1 comment"
                : `${comments.length} comments`}
            </span>
          </Button>
        </div>

        {/* Comments */}
        {isOpenComments && (
          <div>
            <div className="flex flex-col mt-2 text-sm ">
              <Separator className="my-1" />

              <form
                className="flex gap-1 mt-2 sm:gap-2"
                onSubmit={handleSubmit((data) =>
                  handleCreateComment(data, postItem.id, reset)
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Input
                      {...register("comment")}
                      type="text"
                      className="w-full sm:min-w-[20rem] sm:w-[55%]"
                      placeholder="Comment..."
                    />
                    <LoadingButton isLoading={isSubmitting} className="w-fit">
                      Comment
                    </LoadingButton>
                  </div>
                  {errors.comment && (
                    <span className="text-red-500">
                      {errors.comment.message}
                    </span>
                  )}
                </div>
              </form>

              <Separator className="mt-4 mb-1" />

              <div className="overflow-y-auto max-h-[200px]">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 pl-4">
                        <AvatarProfile
                          profilePicture={comment.profilePicture}
                        />
                        <p>{comment.comment}</p>
                      </div>
                      {comment.userId === myUser?.id && (
                        <Button variant="ghost" size="icon">
                          <DropdownDelete
                            isLoading={false}
                            onDelete={() =>
                              handleDeleteComment(comment.id, postItem.id)
                            }
                          />
                        </Button>
                      )}
                    </div>
                    {comments.length > 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
