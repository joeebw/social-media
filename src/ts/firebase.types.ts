export interface UserDataRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
}

export type RespFetchUserList = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}[];
