import { CommentFormValues } from "@/features/posts/components/Post";
import { Post } from "@/ts/post.types";
import api from "@/utils/api";

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const posts = await api.get(`/post/user/${userId}`);

  return posts.data;
};

const fetchFeedPosts = async (): Promise<Post[]> => {
  const posts = await api.get<Post[]>("/post/");

  return posts.data;
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
};
