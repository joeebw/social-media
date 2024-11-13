import { deletePostAndImage, updatePostComments } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Comment } from "../ts/post.types";
import { CommentFormValues } from "../components/Post";
import { UseFormReset } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const usePostActions = (comments: Comment[]) => {
  const queryClient = useQueryClient();

  const handleDeletePost = async (
    postId: string,
    setIsDeletingPost: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setIsDeletingPost(true);
      await deletePostAndImage(postId);
      queryClient.invalidateQueries({ queryKey: ["home posts"] });
    } catch (error) {
      toast.error("Oops! The post cannot be deleted, please try again");
    } finally {
      setIsDeletingPost(false);
    }
  };

  const handleDeleteComment = async (idComment: string, postId: string) => {
    try {
      const filteredComments = comments.filter(
        (comment) => comment.id !== idComment
      );
      await updatePostComments(postId, filteredComments);
      queryClient.invalidateQueries({ queryKey: ["home posts"] });
    } catch (error) {
      toast.error("Oops! The comment cannot be deleted, please try again");
    }
  };

  const handleCreateComment = async (
    data: CommentFormValues,
    postId: string,
    reset: UseFormReset<CommentFormValues>
  ) => {
    try {
      const newComments = [...comments, { id: uuidv4(), text: data.comment }];
      await updatePostComments(postId, newComments);
      reset();
      queryClient.invalidateQueries({ queryKey: ["home posts"] });
    } catch (error) {
      toast.error("Oops! The comment cannot be created, please try again");
    }
  };

  return {
    handleDeletePost,
    handleDeleteComment,
    handleCreateComment,
  };
};

export default usePostActions;
