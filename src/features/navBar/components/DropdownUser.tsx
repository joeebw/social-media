import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useAppStore from "@/state/useStore";
import { logoutUser } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";
import useGetUserData from "@/hooks/useGetUserData";

const DropdownUser = () => {
  const { data: userData } = useGetUserData(true);
  const resetAppStore = useAppStore((state) => state.resetAppStore);
  const name = userData ? `${userData.firstName} ${userData.lastName}` : "";
  const queryClient = useQueryClient();

  const handleLogout = () => {
    resetAppStore();
    queryClient.clear();
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[5rem] font-normal rounded-md bg-gray-200"
        >
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="font-medium focus:bg-red-300"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
