import { ReactNode } from "react";

const HighlightTitle = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <h1
      className="text-3xl font-extrabold tracking-wide cursor-pointer text-primary"
      {...rest}
    >
      {children}
    </h1>
  );
};

export default HighlightTitle;
