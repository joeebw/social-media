import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  children: ReactNode;
  profileUrl?: string;
};

const UserProfileModal = ({ children, profileUrl }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const handleClick = () => {
    if (id) setIsOpen(true);
  };

  return (
    <>
      <div onClick={handleClick}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
        <VisuallyHidden>
          <DialogTitle>Imagen de Perfil</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="w-auto max-w-2xl p-4">
          <div className="flex justify-center p-4">
            <ImageWithSkeleton
              src={profileUrl!}
              alt="Profile"
              className="max-w-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfileModal;
