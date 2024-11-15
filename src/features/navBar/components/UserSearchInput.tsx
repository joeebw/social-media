import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconContext } from "react-icons/lib";
import { IoSearch } from "react-icons/io5";
import { Users } from "@/ts/user.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import useFetchUsers from "../../../hooks/useFetchUsers";
import { BeatLoader } from "react-spinners";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarProfile from "@/components/AvatarProfile";

const UserSearchInput = () => {
  const { data: users, isLoading } = useFetchUsers();
  const [filteredUsers, setFilteredUsers] = useState<Users>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showUserCards, setShowUserCards] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color").trim();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!users) return;

    const term = event.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setSelectedIndex(0);
    setShowUserCards(true);
  };

  const handleInputFocus = () => {
    setShowUserCards(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
        scrollToSelectedItem(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex =
          prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex;
        scrollToSelectedItem(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter") {
      if (selectedIndex !== -1) {
        handleUserSelect(filteredUsers[selectedIndex]);
      }
      inputRef.current?.blur();
    } else if (event.key === "Escape") {
      setShowUserCards(false);
    }
  };

  const handleUserSelect = (user: Users[0]) => {
    console.log("Selected user:", user);
    setSelectedIndex(0);
    setShowUserCards(false);
  };

  const scrollToSelectedItem = (index: number) => {
    if (listRef.current && listRef.current.children[index]) {
      listRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowUserCards(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  return (
    <div className="w-full max-w-md" ref={containerRef}>
      <div className="relative w-64">
        <Input
          className="bg-gray-100 rounded-lg pr-9 focus:border-primary focus:ring-primary"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
        <IconContext.Provider
          value={{
            size: "1.3rem",
            className: "absolute top-2 right-3 text-gray-500",
          }}
        >
          <IoSearch />
        </IconContext.Provider>

        {showUserCards && (
          <Card className="absolute top-11 max-h-[20rem] w-96 shadow-lg bg-secondaryBackground z-20">
            <CardHeader>
              <CardTitle>Filtered Users</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[16rem]">
              <CardContent className="h-full">
                {isLoading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <BeatLoader color={primaryColor} />
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <ul className="space-y-2" ref={listRef}>
                    {filteredUsers.map((user, index) => (
                      <li
                        key={user.id}
                        className={clsx(
                          "flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-200",
                          index === selectedIndex ? "bg-gray-200" : ""
                        )}
                        onClick={() => handleUserSelect(user)}
                      >
                        <AvatarProfile
                          profilePicture={user.profilePicture}
                          alt={user.name}
                        />

                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-gray-500">{user.email}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex items-center justify-center h-full text-gray-500">
                    No users found.
                  </p>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserSearchInput;
