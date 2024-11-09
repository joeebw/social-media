import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type Props = {
  profilePicture?: string;
  alt?: string;
  className?: string;
};

const AvatarProfile = ({ profilePicture, alt, className }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={profilePicture} alt={alt} />
      <AvatarFallback>
        <Skeleton className="w-full h-full bg-gray-400 rounded-xl" />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
