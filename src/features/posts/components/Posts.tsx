import { fetchAllPosts } from "@/utils/firebase";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { PropagateLoader } from "react-spinners";

const Posts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["home posts"],
    queryFn: fetchAllPosts,
  });
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color").trim();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <PropagateLoader color={primaryColor} className="mt-14" />;
      </div>
    );
  }

  return (
    <div>
      {posts!.map((post) => (
        <Post postItem={post} />
      ))}
    </div>
  );
};

export default Posts;
