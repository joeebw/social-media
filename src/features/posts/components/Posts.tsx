import Post from "./Post";
import { PropagateLoader } from "react-spinners";
import { useRealtimePosts } from "../hooks/useRealTimePosts";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Posts = () => {
  const { id } = useParams();
  const {
    data: posts,
    isLoading,
    loadMorePosts,
    hasMore,
    isLoadingMore,
  } = useRealtimePosts(id);

  const { ref, inView } = useInView({
    threshold: 0,

    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && !isLoadingMore && hasMore) {
      loadMorePosts();
    }
  }, [inView, isLoadingMore, hasMore]);

  if (isLoading || !posts) {
    return (
      <div className="flex justify-center">
        <PropagateLoader className="mt-14" color={`hsl(var(--primary))`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {posts!.map((post) => (
        <Post postItem={post} key={post.id} />
      ))}

      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          {isLoadingMore && (
            <PropagateLoader
              color={`hsl(var(--primary))`}
              size={8}
              className="my-2"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
