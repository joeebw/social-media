import HighlightTitle from "@/components/HighlightTitle";
import { IconContext } from "react-icons/lib";
import { IoMdSunny, IoMdNotifications } from "react-icons/io";
import { MdMessage, MdNightlightRound } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import UserSearchInput from "./UserSearchInput";
import DropdownUser from "./DropdownUser";
import { Link } from "react-router-dom";

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
  const [isDayMode, setIsDayMode] = useState(true);

  return (
    <nav className="flex items-center justify-center h-20 shadow-sm bg-secondaryBackground">
      <div className="flex items-center justify-between w-10/12 mx-auto">
        {/* title and search input */}
        <div className="flex items-center gap-8">
          <Link to="/home">
            <HighlightTitle>WolfStream</HighlightTitle>
          </Link>
          <UserSearchInput />
        </div>

        <IconContext.Provider value={{ size: "1.3rem" }}>
          <div className="flex items-center gap-6">
            <div
              className="p-2 transition-all rounded-md cursor-pointer hover:bg-gray-300"
              onClick={() => setIsDayMode(!isDayMode)}
            >
              {isDayMode ? <IoMdSunny /> : <MdNightlightRound />}
            </div>

            {INCON_COMPONENTS.map((icon) => {
              return (
                <div
                  className="p-2 text-gray-500 rounded-md cursor-not-allowed"
                  key={icon.key}
                >
                  {icon.icon}
                </div>
              );
            })}

            <DropdownUser />
          </div>
        </IconContext.Provider>
      </div>
    </nav>
  );
};

export default NavBar;
