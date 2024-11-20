import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import useGetUserData from "@/hooks/useGetUserData";
import useLogout from "../hooks/useLogout";

const DropdownUser = () => {
  const { data: userData } = useGetUserData(true);
  const { handleLogout } = useLogout();

  const name = userData ? `${userData.firstName} ${userData.lastName}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hidden lg:block min-w-[5rem] font-normal rounded-md bg-gray-200"
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
