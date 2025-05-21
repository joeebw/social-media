import { Button } from "@/components/ui/button";
import useAppStore from "@/state/useStore";
import { updatePostLikes } from "@/utils/firebase";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  likes: number;
  postId: string;
};

const LikesPost = ({ likes, postId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppStore((state) => state.idUser);

  const handleAddAndRemoveLikes = async () => {
    try {
      setIsLoading(true);
      let updatedLikes: string[];
      if (likes.includes(userId as string)) {
        updatedLikes = likes.filter((id) => id !== userId);
      } else {
        updatedLikes = [...likes, userId as string];
      }

      await updatePostLikes(postId, updatedLikes);
    } catch (error) {
      toast.error("Oops! Likes can not be updated, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 hover:bg-muted"
      onClick={handleAddAndRemoveLikes}
    >
      <Heart className="w-5 h-5" />
      <span>
        {" "}
        {likes === 0 ? "No likes" : likes === 1 ? "1 like" : `${likes} likes`}
      </span>
    </Button>
  );
};

export default LikesPost;
