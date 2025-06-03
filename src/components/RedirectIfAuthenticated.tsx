import useAppStore from "@/state/useStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  redirectTo?: string;
}

const RedirectIfAuthenticated = ({ children, redirectTo = "/home" }: Props) => {
  const token = localStorage.getItem("token");
  // const isAuthenticated = useAppStore((state) => state.idUser);

  if (token) {
    return <Navigate to={redirectTo} />;
  }

  // if (isAuthenticated) {
  //   return <Navigate to={redirectTo} />;
  // }

  return children;
};

export default RedirectIfAuthenticated;
