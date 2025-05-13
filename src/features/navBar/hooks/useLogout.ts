import useAppStore from "@/state/useStore";
import { logoutUser } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const resetAppStore = useAppStore((state) => state.resetAppStore);
  const setUserId = useAppStore((state) => state.setIdUser);
  const handleLogout = async () => {
    resetAppStore();
    queryClient.clear();
    await logoutUser();

    localStorage.removeItem("token");
    setUserId(null);
    navigate("/", { replace: true });
  };

  return { handleLogout };
};

export default useLogout;
