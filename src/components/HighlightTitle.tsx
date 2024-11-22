import clsx from "clsx";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const HighlightTitle = ({ children, ...rest }: { children: ReactNode }) => {
  const pathName = useLocation().pathname;

  return (
    <h1
      className={clsx(
        "text-2xl lg:text-3xl font-extrabold tracking-wide text-primary",
        pathName === "/login" ? "cursor-default" : "cursor-pointer"
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default HighlightTitle;
