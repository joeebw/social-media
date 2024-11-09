import AvatarProfile from "@/components/AvatarProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post as PostType } from "@/ts/post.types";
import timeAgo from "@/utils/timeAgo";
import { Heart, MessageCircle } from "lucide-react";

type Props = {
  postItem: PostType;
};

const Post = ({ postItem }: Props) => {
  const {
    firstName,
    lastName,
    datePost,
    description,
    picturePath,
    userPicturePath,
  } = postItem;
  const name = `${firstName} ${lastName}`;
  const timeAgoPost = timeAgo(datePost);

  return (
    <Card className="w-full bg-secondaryBackground">
      <CardHeader className="flex flex-row items-center gap-4">
        <AvatarProfile profilePicture={userPicturePath} alt="profile picture" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{timeAgoPost}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>

        <div className="relative w-full mt-4 h-[700px]">
          <img
            src={picturePath}
            alt="Vista previa del proyecto"
            className="absolute object-cover w-full h-full rounded-lg"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-7">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-200"
        >
          <Heart className="w-5 h-5" />
          <span>15 likes</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-200"
        >
          <MessageCircle className="w-5 h-5" />
          <span>3 comentarios</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
