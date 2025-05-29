import { CommentFormValues } from "@/features/posts/components/Post";
import { CreatePostRequest } from "@/features/posts/ts/post.types";
import { formatPost } from "@/features/posts/utils/formatPost";
import imageService from "@/shared/services/imageService";
import { CreatePost, Post } from "@/ts/post.types";
import api from "@/utils/api";

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  console.log("running fetch user posts: ", userId);
  try {
    const postsResponse = await api.get<Post[]>(`/post/user/${userId}`);

    // ¡AÑADE ESTE LOG CLAVE!
    console.log("Raw posts.data from API:", postsResponse.data);
    console.log("Type of posts.data:", typeof postsResponse.data);
    console.log("Is posts.data an array?", Array.isArray(postsResponse.data));

    // Asegúrate de que postsResponse.data es un array antes de pasarlo a formatPost
    // Si postsResponse.data puede ser null/undefined/no-array, maneja el caso
    if (!postsResponse.data || !Array.isArray(postsResponse.data)) {
      console.warn(
        "API returned invalid data for user posts:",
        postsResponse.data
      );
      return []; // Retorna un array vacío si los datos no son válidos
    }

    // Asegúrate de que 'formatPost' es la función correcta para un array de posts
    // Debería ser 'formatUserPostsForResponse' según nuestro último Canvas.
    const formattedPosts = formatPost(postsResponse.data);

    console.log("formattedPosts: ", formattedPosts);

    return formattedPosts;
  } catch (error) {
    console.error("Error in fetchUserPosts:", error);
    throw error; // Re-lanzar el error para que sea manejado por React Query
  }
};

const fetchFeedPosts = async (): Promise<Post[]> => {
  console.log("running fetch feed posts");
  const posts = await api.get<Post[]>("/post/");
  const formattedPosts = formatPost(posts.data);

  return formattedPosts;
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

const removePost = async (idPost: string) => {
  await api.delete(`/post/${idPost}`);
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
  removePost,
};
