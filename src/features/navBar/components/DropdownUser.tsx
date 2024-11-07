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

const DropdownUser = () => {
  const userData = useAppStore((state) => state.user);
  const name = userData ? `${userData.firstName} ${userData.lastName}` : "";

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gray-300 min-w-[5rem] font-normal rounded-md">
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="font-medium cursor-pointer hover:bg-red-300"
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
