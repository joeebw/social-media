import NotFoundPage from "@/components/NotFoundPage";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  useAuthRedirect();
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
