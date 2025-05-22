import { CommentFormValues } from "@/features/posts/components/Post";
import { CreatePostRequest } from "@/features/posts/ts/post.types";
import imageService from "@/shared/services/imageService";
import { CreatePost, Post } from "@/ts/post.types";
import api from "@/utils/api";

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const posts = await api.get(`/post/user/${userId}`);

  return posts.data;
};

const fetchFeedPosts = async (): Promise<Post[]> => {
  const posts = await api.get<Post[]>("/post/");

  return posts.data;
};

const createPost = async (data: CreatePost) => {
  let image: Record<string, string> | null = null;
  if (data.file) {
    image = await imageService.uploadToImgBB(data.file as File);
  }

  const post: CreatePostRequest = {
    firstName: data.firstName,
    lastName: data.lastName,
    description: data.description,
    location: data.location,
    pictureId: image ? image.id : image,
    picturePath: image ? image.url : image,
    userPicturePath: data.profielPicture as string,
  };

  await api.post("/post", post);
};

const addAndRemoveLike = async (idPost: string) => {
  await api.post(`/like/${idPost}`);
};

const createComment = async (data: CommentFormValues, postId: string) => {
  await api.post(`/comment/${postId}`, { comment: data.comment });
};

const deleteComment = async (idComment: string, postId: string) => {
  await api.delete(`/comment/post/${postId}/comment/${idComment}`);
};

export default {
  fetchFeedPosts,
  fetchUserPosts,
  addAndRemoveLike,
  createComment,
  deleteComment,
  createPost,
};
