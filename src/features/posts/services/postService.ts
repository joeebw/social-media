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

export default {
  fetchFeedPosts,
  fetchUserPosts,
};
