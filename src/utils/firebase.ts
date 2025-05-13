import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { UserDataRegister } from "@/ts/firebase.types";
import axios from "axios";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/features/auth/hooks/useHandleLogin";
import { User } from "@/state/userStore.type";
import { CreatePost, Post } from "@/ts/post.types";
import { Comment } from "@/features/posts/ts/post.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const uploadToImgBB = async (file: File) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return {
      url: data.data.url,
      id: data.data.id,
    };
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

// const uploadToImgBB = async (file: File) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const { data } = await axios.post(
//       "/.netlify/functions/uploadImages",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return {
//       url: data.url,
//       id: data.id,
//     };
//   } catch (error) {
//     console.error("Error uploading image to ImgBB:", error);
//     throw error;
//   }
// };

export const registerUserWithImage = async (
  userData: UserDataRegister,
  file: File
) => {
  try {
    const { email, password, firstName, lastName, location, occupation } =
      userData;

    const imageURL = await uploadToImgBB(file);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const uid = user.uid;

    await setDoc(doc(db, "usersWolfstream", uid), {
      id: uid,
      email: user.email,
      firstName,
      lastName,
      location,
      occupation,
      profilePicture: imageURL,
      friends: [],
    });

    // console.log(
    //   "User registered with image and related contacts collection created 🚀"
    // );
  } catch (error: any) {
    console.error("Error registering user or uploading image:", error);
    const errorCode = error?.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        toast.error("This email is already registered");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email format");
        break;
      case "auth/operation-not-allowed":
        toast.error("Email registration is not enabled");
        break;
      case "auth/weak-password":
        toast.error("Password is too weak");
        break;
      default:
        toast.error("Error registering user: " + error.message);
    }
  }
};

export const createPost = async (postData: CreatePost) => {
  try {
    const {
      file,
      userId,
      profielPicture,
      firstName,
      lastName,
      location,
      description,
    } = postData;

    let image: { url: string; id: string } | null = null;

    if (file) {
      image = await uploadToImgBB(file);
    }

    await addDoc(collection(db, "postsWolfstream"), {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      location: location,
      description: description,
      userPicturePath: profielPicture,
      picturePath: image?.url ?? "",
      pictureId: image?.id ?? "",
      likes: [],
      comments: [],
      datePost: Date.now(),
    });
    // console.log("post created 📄");
  } catch (error) {
    console.error(error);
    toast.error("The post cannot be created, please try again.");
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
  form: UseFormReturn<FormValues, any, undefined>
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // console.log("User logged in");
  } catch (error: any) {
    console.error("Error logging in:", error);
    const errorCode = error?.code;
    switch (errorCode) {
      case "auth/invalid-email":
        form.setError("email", {
          type: "manual",
          message: "Invalid email format",
        });
        break;
      case "auth/user-disabled":
        toast.error("This account has been disabled");
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
        break;
      case "auth/too-many-requests":
        toast.error("Too many failed attempts. Please try again later");
        break;
      default:
        toast.error("Login error: " + error.message);
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    // console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const fetchUserById = async (id: string) => {
  // console.log("Running fetch user by id: ", id);
  try {
    const userDocRef = doc(db, "usersWolfstream", id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const user: unknown = { id: userDoc.id, ...userDoc.data() };
      return user as User;
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    throw error;
  }
};

export const updateUserFriends = async (
  userId: string,
  newFriendList: string[]
) => {
  try {
    const userRef = doc(db, "usersWolfstream", userId);

    await updateDoc(userRef, {
      friends: newFriendList,
    });

    return true;
  } catch (error) {
    console.error("Error updating comments:", error);
    throw error;
  }
};

export const fetchUserList = async () => {
  try {
    const usersCollection = collection(db, "usersWolfstream");
    const querySnapshot = await getDocs(usersCollection);

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users as User[];
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw error;
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    const q = query(
      collection(db, "postsWolfstream"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data() } as Post);
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "postsWolfstream"));
    const posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      } as Post);
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

export const subscribeToAllPosts = (
  onUpdate: (posts: Post[], snapshot: any) => void
): (() => void) => {
  // console.log("running sucribe to all posts");

  const q = query(
    collection(db, "postsWolfstream"),
    orderBy("datePost", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts: Post[] = [];
    snapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      } as Post);
    });
    onUpdate(posts, snapshot);
  });

  return unsubscribe;
};

export const subscribeToUserPosts = (
  userId: string,
  onUpdate: (posts: Post[], snapshot: any) => void
): (() => void) => {
  // console.log("running sucribe to users posts");

  const q = query(
    collection(db, "postsWolfstream"),
    where("userId", "==", userId),
    orderBy("datePost", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts: Post[] = [];
    snapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      } as Post);
    });
    onUpdate(posts, snapshot);
  });

  return unsubscribe;
};

export const deletePostAndImage = async (postId: string) => {
  try {
    const postRef = doc(db, "postsWolfstream", postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const updatePostComments = async (
  postId: string,
  newComments: Comment[]
) => {
  try {
    const postRef = doc(db, "postsWolfstream", postId);

    await updateDoc(postRef, {
      comments: newComments,
    });

    return true;
  } catch (error) {
    console.error("Error updating comments:", error);
    throw error;
  }
};

export const updatePostLikes = async (postId: string, likes: string[]) => {
  try {
    const postRef = doc(db, "postsWolfstream", postId);

    await updateDoc(postRef, {
      likes: likes,
    });

    return true;
  } catch (error) {
    console.error("Error updating likes:", error);
    throw error;
  }
};

export const updateFriendList = async (
  userId: string,
  newFriendList: string[]
) => {
  try {
    const postRef = doc(db, "usersWolfstream", userId);

    await updateDoc(postRef, {
      friends: newFriendList,
    });

    return true;
  } catch (error) {
    console.error("Error updating friend list:", error);
    throw error;
  }
};
