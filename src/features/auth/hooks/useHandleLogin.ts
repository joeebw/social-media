import { useEffect, useState } from "react";
import { registerUserWithImage } from "@/utils/firebase";
import { UserDataRegister } from "@/ts/firebase.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues } from "../components/LoginForm/LoginForm";
import { z } from "zod";
import useAppStore from "@/state/useStore";
import { loginUser as loginUserWithEmail } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    profilePicture: z
      .instanceof(File, { message: "Profile picture is required" })
      .refine((file) => file !== undefined, "Profile picture is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    location: z.string().min(1, "Location is required"),
    occupation: z.string().min(1, "Occupation is required"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export type FormValues = LoginFormValues | RegisterFormValues;

const signInDefaultValues = {
  email: "",
  password: "",
};

const signUpDefaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
  profilePicture: null as unknown as File,
  firstName: "",
  lastName: "",
  location: "",
  occupation: "",
};

const useAuth = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isSignIn = useAppStore((state) => state.isSignIn);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(isSignIn ? loginSchema : registerSchema),
    defaultValues: isSignIn ? signInDefaultValues : signUpDefaultValues,
    mode: "onBlur",
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      form.setValue("profilePicture", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const registerUser = async (data: RegisterFormValues) => {
    const userData: UserDataRegister = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      location: data.location,
      occupation: data.occupation,
    };
    await registerUserWithImage(userData, data.profilePicture);
  };

  const loginUser = async (data: LoginFormValues) => {
    try {
      await loginUserWithEmail(data.email, data.password, form);
      navigate("/home");
    } catch (error) {
      console.error("Error in login user");
    }
  };

  const handleSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    if (isSignIn) {
      const loginData = data as LoginFormValues;
      await loginUser(loginData);
    } else {
      const registerData = data as RegisterFormValues;
      await registerUser(registerData);
    }
  };

  useEffect(() => {
    if (isSignIn) {
      form.reset(signInDefaultValues);
    } else {
      form.reset(signUpDefaultValues);
      setSelectedFile(null);
    }
  }, [isSignIn, form]);

  return { form, handleFileSelect, handleSubmit, selectedFile };
};

export default useAuth;
