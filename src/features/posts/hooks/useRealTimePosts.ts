import { Post } from "@/ts/post.types";
import { subscribeToAllPosts } from "@/utils/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useRealtimePosts = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeToAllPosts((posts) => {
      queryClient.setQueryData(["home posts"], posts);
    });

    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<Post[]>({
    queryKey: ["home posts"],
    queryFn: () => queryClient.getQueryData(["home posts"]) ?? [],
    select: (data: Post[]) => {
      return [...data].sort((a, b) => b.datePost - a.datePost);
    },
  });
};

export default useRealtimePosts;
