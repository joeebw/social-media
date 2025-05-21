import { Button } from "@/components/ui/button";
import useLikeActions from "@/features/posts/hooks/useLikeActions";
import { Heart } from "lucide-react";

type Props = {
  likes: number;
  postId: string;
};

const LikesPost = ({ likes, postId }: Props) => {
  const { addAndRemoveLike, isLoading } = useLikeActions();

  const handleAddAndRemoveLikes = async () => {
    await addAndRemoveLike(postId);
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
