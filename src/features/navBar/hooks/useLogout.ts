import useAppStore from "@/state/useStore";
import { logoutUser } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  const resetAppStore = useAppStore((state) => state.resetAppStore);
  const handleLogout = () => {
    resetAppStore();
    queryClient.clear();
    logoutUser();
  };

  return { handleLogout };
};

export default useLogout;
