import { Post } from "@/ts/post.types";

export const formatPost = (posts: Post[]) => {
  const formattedPosts = posts.map((post) => {
    const formattedComments = post.comments.map((comment) => {
      return {
        ...comment,
        id: String(comment.id),
        userId: String(comment.userId),
      };
    });

    return {
      ...post,
      id: String(post.id),
      userId: String(post.userId),
      comments: formattedComments,
    };
  });

  return formattedPosts;
};
