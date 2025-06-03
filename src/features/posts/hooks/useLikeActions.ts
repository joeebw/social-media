import postService from "@/features/posts/services/postService";
import { useState } from "react";
import { toast } from "sonner";

const useLikeActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addAndRemoveLike = async (idPost: string) => {
    try {
      setIsLoading(true);
      await postService.addAndRemoveLike(idPost);
    } catch (error) {
      toast.error("Oops! Likes can not be updated, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addAndRemoveLike,
    isLoading,
  };
};

export default useLikeActions;
