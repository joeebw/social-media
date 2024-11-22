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
          className="hidden lg:block min-w-[5rem] font-normal rounded-md bg-muted"
        >
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="font-medium focus:text-destructive-foreground focus:bg-destructive"
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
