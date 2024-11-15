export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  profilePicture: {
    id: string;
    url: string;
  };
  friends: string[];
};
