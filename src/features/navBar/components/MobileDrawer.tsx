import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconContext } from "react-icons/lib";
import { RxHamburgerMenu } from "react-icons/rx";
import useLogout from "../hooks/useLogout";
import UserSearchInput from "./UserSearchInput";

const MovileDrawer = () => {
  const { handleLogout } = useLogout();

  return (
    <Sheet>
      <IconContext.Provider value={{ size: "1.3rem" }}>
        <SheetTrigger asChild className="lg:hidden">
          <RxHamburgerMenu />
        </SheetTrigger>
      </IconContext.Provider>
      <SheetContent className="flex flex-col justify-between">
        <UserSearchInput className="w-full mt-8" />

        <Button
          className="w-full font-medium bg-red-400"
          variant="default"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MovileDrawer;