import { Comment } from "@/features/posts/ts/post.types";

export type CreatePost = {
  file: File | null;
  userId: string;
  profielPicture: string | undefined;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
};

export type Post = {
  id: string;
  comments: Comment[];
  datePost: number;
  description: string;
  firstName: string;
  lastName: string;
  likes: string[];
  location: string;
  picturePath: string;
  userId: string;
  userPicturePath: string;
  pictureId: string;
};
