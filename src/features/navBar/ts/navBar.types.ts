export type Users = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}[];

export type RespFetchUserList = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}[];
