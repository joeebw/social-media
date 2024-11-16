import { Post } from "@/ts/post.types";
import { subscribeToAllPosts, subscribeToUserPosts } from "@/utils/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useRealtimePosts = (userId?: string) => {
  const queryClient = useQueryClient();
  const isUserPosts = !!userId;
  const queryKey = isUserPosts ? ["user posts", userId] : ["home posts"];

  useEffect(() => {
    const unsubscribe = isUserPosts
      ? subscribeToUserPosts(userId, (posts) => {
          queryClient.setQueryData(queryKey, posts);
        })
      : subscribeToAllPosts((posts) => {
          queryClient.setQueryData(queryKey, posts);
        });

    return () => unsubscribe();
  }, [queryClient, userId, isUserPosts, queryKey]);

  return useQuery<Post[]>({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey) ?? [],
    select: (data: Post[]) => {
      return [...data].sort((a, b) => b.datePost - a.datePost);
    },
  });
};

export default useRealtimePosts;
