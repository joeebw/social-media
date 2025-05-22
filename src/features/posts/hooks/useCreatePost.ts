import postService from "@/features/posts/services/postService";
import { CreatePost } from "@/ts/post.types";
import { toast } from "sonner";

const useCreatePost = () => {
  const createPost = async (data: CreatePost) => {
    try {
      await postService.createPost(data);
      toast.success("Your post has been successfully uploaded!");
    } catch (error) {
      toast.error("Oops! The post cannot be created, please try again");
    }
  };

  return {
    createPost,
  };
};

export default useCreatePost;
