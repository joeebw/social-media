import { ReactNode } from "react";

const HighlightTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-3xl font-extrabold tracking-wide cursor-default text-primary">
      {children}
    </h1>
  );
};

export default HighlightTitle;
