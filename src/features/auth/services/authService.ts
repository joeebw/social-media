import { RegisterFormValues } from "@/features/auth/types";
import imageService from "@/shared/services/imageService";
import api from "@/utils/api";

const register = async ({
  email,
  password,
  firstName,
  lastName,
  location,
  occupation,
  profilePicture,
}: RegisterFormValues) => {
  const image = await imageService.uploadToImgBB(profilePicture);

  const user = await api.post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
    location,
    occupation,
    profilePicture: image.url,
  });

  localStorage.setItem("token", user.data.token);

  return user.data.id.toString();
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", user.data.token);

  return user.data.id.toString();
};

export default { register, login };
