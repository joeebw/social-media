import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  isLoading: boolean;
  messageLoading: string;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

export default function LoadingButton({
  children,
  isLoading,
  messageLoading,
  className,
  type = "submit",
  onClick,
}: Props) {
  return (
    <Button
      type={type}
      className={clsx("w-full", className)}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {messageLoading}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
