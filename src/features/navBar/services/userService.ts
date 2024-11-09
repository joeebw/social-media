import { fetchUserById, fetchUserList } from "@/utils/firebase";
import { Users } from "@/ts/user.types";

const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    name: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "7",
    name: "Christopher Thompson",
    email: "christopher.thompson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

const fetchUsers = async () => {
  // const userList = await fetchUserList();

  // if (!userList) {
  //   throw new Error("userList not found");
  // }

  // const formmatedUserList: Users = userList.map(
  //   ({ id, email, firstName, lastName, profilePicture }) => {
  //     const name = `${firstName} ${lastName}`;
  //     return {
  //       id,
  //       name,
  //       email,
  //       profilePicture,
  //     };
  //   }
  // );

  // return formmatedUserList;

  return USERS;
};

const fetchUser = async (id: string) => {
  const user = await fetchUserById(id);
  return user;
};

export default {
  fetchUsers,
  fetchUser,
};
