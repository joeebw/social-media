import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { UserData } from "@/ts/firebase.types";
import axios from "axios";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/features/auth/hooks/useHandleLogin";

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
    return data.data.url;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

export const registerUserWithImage = async (userData: UserData, file: File) => {
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
      email: user.email,
      firstName,
      lastName,
      location,
      occupation,
      profilePicture: imageURL,
    });

    console.log(
      "User registered with image and related contacts collection created 🚀"
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const loginUser = async (
  email: string,
  password: string,

  form: UseFormReturn<FormValues, any, undefined>
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in");
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
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
