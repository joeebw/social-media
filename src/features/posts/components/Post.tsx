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
import useAppStore from "@/state/useStore";
import LikesPost from "./LikesPost";

type Props = {
  postItem: PostType;
};

const MAX_CHARACTERS = 100;

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
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
  const { handleCreateComment, handleDeleteComment, handleDeletePost } =
    usePostActions(comments);
  const name = `${firstName} ${lastName}`;
  const timeAgoPost = timeAgo(datePost);
  const userId = useAppStore((state) => state.idUser);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const isButtonDisabled = !watch("comment") || isSubmitting;

  return (
    <Card className="w-full bg-secondaryBackground">
      <CardHeader className="flex flex-row items-center justify-between ">
        <div className="flex gap-4">
          <AvatarProfile
            profilePicture={userPicturePath}
            alt="profile picture"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">{timeAgoPost}</p>
          </div>
        </div>

        {userId === userPostId && (
          <DropdownDelete
            isLoading={isDeletingPost}
            onDelete={() => handleDeletePost(postItem.id, setIsDeletingPost)}
          />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-base">{description}</p>

        {picturePath && (
          <ImageWithSkeleton
            src={picturePath}
            alt="post image"
            containerClassName="w-full mt-4 h-[700px]"
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
            className="flex items-center gap-2 hover:bg-gray-200"
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
                className="flex items-center gap-2 mt-2"
                onSubmit={handleSubmit((data) =>
                  handleCreateComment(data, postItem.id, reset)
                )}
              >
                <Input
                  {...register("comment")}
                  type="text"
                  className="min-w-[20rem] w-[55%] focus:ring-primary"
                  placeholder="Comment..."
                />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  {errors.comment && (
                    <span className="text-red-500">
                      {errors.comment.message}
                    </span>
                  )}
                </div>
                <Button size="sm" disabled={isButtonDisabled}>
                  Comment
                </Button>
              </form>

              <Separator className="mt-4 mb-1" />

              <div className="overflow-y-auto max-h-[200px]">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex items-center justify-between">
                      <p className="pl-4">{comment.text}</p>
                      <Button variant="ghost" size="icon">
                        <DropdownDelete
                          isLoading={false}
                          onDelete={() =>
                            handleDeleteComment(comment.id, postItem.id)
                          }
                        />
                      </Button>
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
