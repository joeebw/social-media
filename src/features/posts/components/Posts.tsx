import Post from "./Post";
import { PropagateLoader } from "react-spinners";
import useRealtimePosts from "../hooks/useRealTimePosts";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const { data: posts, isLoading } = useRealtimePosts(id);

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
    <div className="flex flex-col gap-8">
      {posts!.map((post) => (
        <Post postItem={post} key={post.datePost} />
      ))}
    </div>
  );
};

export default Posts;
