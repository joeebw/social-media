export type CreatePost = {
  file: File | null;
  userId: string;
  profielPicture: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
};

export type Post = {
  comments: string[];
  datePost: number;
  description: string;
  firstName: string;
  lastName: string;
  likes: string[];
  location: string;
  picturePath: string;
  userId: string;
  userPicturePath: string;
};
