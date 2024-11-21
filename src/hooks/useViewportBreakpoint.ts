import { useEffect, useState } from "react";

const useViewportBreakpoint = (width: number) => {
  const [isWidthMet, setIsWidthMet] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const windowWidth = window.innerWidth;
      setIsWidthMet(windowWidth >= width);
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [width]);

  return isWidthMet;
};

export default useViewportBreakpoint;
