import HighlightTitle from "@/components/HighlightTitle";
import { IconContext } from "react-icons/lib";
import { IoMdSunny, IoMdNotifications } from "react-icons/io";
import { MdMessage, MdNightlightRound } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import UserSearchInput from "./UserSearchInput";
import DropdownUser from "./DropdownUser";
import { Link } from "react-router-dom";
import MovileDrawer from "./MobileDrawer";
import useAppStore from "@/state/useStore";

const INCON_COMPONENTS = [
  {
    icon: <MdMessage />,
    key: "message",
  },
  {
    icon: <IoMdNotifications />,
    key: "notifications",
  },
  {
    icon: <FaQuestionCircle />,
    key: "question",
  },
];

const NavBar = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const setIsDarkMode = useAppStore((state) => state.setIsDarkMode);

  return (
    <nav className="flex items-center justify-center h-20 shadow-sm bg-card">
      <div className="flex items-center justify-between w-11/12 mx-auto xl:w-10/12">
        {/* title and search input */}
        <div className="flex items-center gap-8">
          <Link to="/home">
            <HighlightTitle>WolfStream</HighlightTitle>
          </Link>

          <UserSearchInput className="hidden lg:block" />
        </div>

        <IconContext.Provider value={{ size: "1.3rem" }}>
          <div className="flex items-center gap-6">
            <div
              className="hidden p-2 transition-all rounded-md cursor-pointer lg:block hover:bg-muted"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <MdNightlightRound /> : <IoMdSunny />}
            </div>

            {INCON_COMPONENTS.map((icon) => {
              return (
                <div
                  className="hidden p-2 text-gray-500 rounded-md cursor-not-allowed lg:block"
                  key={icon.key}
                >
                  {icon.icon}
                </div>
              );
            })}

            <DropdownUser />
          </div>

          {/* Hamburger Menu Movile */}
          <div className="flex items-center gap-5 lg:hidden">
            <div
              className="p-2 transition-all rounded-md cursor-pointer hover:bg-muted"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <MdNightlightRound /> : <IoMdSunny />}
            </div>
            <MovileDrawer />
          </div>
        </IconContext.Provider>
      </div>
    </nav>
  );
};

export default NavBar;
