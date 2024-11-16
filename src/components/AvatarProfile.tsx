import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type Props = {
  profilePicture?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
};

const AvatarProfile = ({ profilePicture, alt, className, ...rest }: Props) => {
  return (
    <Avatar className={className} {...rest}>
      <AvatarImage
        src={profilePicture}
        alt={alt}
        className="object-cover object-center"
      />
      <AvatarFallback>
        <Skeleton className="w-full h-full bg-gray-400 rounded-xl" />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
