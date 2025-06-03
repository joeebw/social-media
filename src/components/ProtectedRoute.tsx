import useAppStore from "@/state/useStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = useAppStore((state) => state.idUser);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
