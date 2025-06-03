export type Comment = {
  id: string;
  comment: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  userId: string;
};

export type CreatePostRequest = {
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  pictureId: string | null;
  picturePath: string | null;
  userPicturePath: string;
};
