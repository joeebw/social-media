import { CommentFormValues } from "@/features/posts/components/Post";
import { Post } from "@/ts/post.types";
import api from "@/utils/api";

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const posts = await api.get(`/post/user/${userId}`);

  return posts.data;
};

const fetchFeedPosts = async (): Promise<Post[]> => {
  const posts = await api.get("/post/");

  return posts.data;
};

const addAndRemoveLike = async (idPost: string) => {
  await api.post(`/like/${idPost}`);
};

const createComment = async (data: CommentFormValues, postId: string) => {
  await api.post(`/comment/${postId}`, { comment: data.comment });
};

export default {
  fetchFeedPosts,
  fetchUserPosts,
  addAndRemoveLike,
  createComment,
};
