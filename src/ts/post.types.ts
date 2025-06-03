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
  datePost: number;
  description: string;
  firstName: string;
  lastName: string;
  location: string;
  picturePath: string;
  userId: string;
  userPicturePath: string;
  pictureId: string;
  likes: number;
  comments: Comment[];
};
