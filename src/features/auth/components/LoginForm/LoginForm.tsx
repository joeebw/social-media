import * as z from "zod";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInputField from "@/features/auth/components/FormInputField";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ImageDropzone from "./ImageDropzone";
import {
  SIGNIN_FIELDS,
  SIGNUP_FIELDS,
} from "@/features/auth/constants/formFields";
import useAppStore from "@/state/useStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  profilePicture: z
    .instanceof(File, { message: "Profile picture is required" })
    .refine((file) => file !== undefined, "Profile picture is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  location: z.string().min(1, "Location is required"),
  occupation: z.string().min(1, "Occupation is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

type FormValues = LoginFormValues | RegisterFormValues;

const signInDefaultValues = {
  email: "",
  password: "",
};

const signUpDefaultValues = {
  email: "",
  password: "",
  profilePicture: null as unknown as File,
  firstName: "",
  lastName: "",
  location: "",
  occupation: "",
};

const LoginForm = () => {
  const isSignIn = useAppStore((state) => state.isSignIn);
  const toggleSignIn = useAppStore((state) => state.toggleSignIn);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    if (isSignIn) {
      const loginData = data as LoginFormValues;
      console.log("Login:", loginData);
    } else {
      const registerData = data as RegisterFormValues;
      console.log("Register:", registerData);
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

  return (
    <div className="w-full sm:w-[47rem] rounded-lg shadow-md p-9 bg-secondaryBackground">
      <p className="font-medium text-text">
        Welcome to WolfStream, Sign in to start streaming your favorite content!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={clsx(
            "mt-5 grid gap-y-4 grid-cols-2",
            !isSignIn && "gap-x-4"
          )}
        >
          {isSignIn &&
            SIGNIN_FIELDS.map((field) => (
              <FormInputField
                control={form.control}
                name={field.name}
                label={field.label}
                type={field.type}
                isError={
                  !!form.formState.errors[
                    field.name as keyof typeof form.formState.errors
                  ]
                }
                form={form}
                className="col-span-2"
                key={`${field.name}-${isSignIn}`}
              />
            ))}

          {!isSignIn &&
            SIGNUP_FIELDS.map((field) => (
              <FormInputField
                control={form.control}
                name={field.name}
                label={field.label}
                type={field.type}
                isError={
                  !!form.formState.errors[
                    field.name as keyof typeof form.formState.errors
                  ]
                }
                form={form}
                className={field.className ?? ""}
                key={`${field.name}-${isSignIn}`}
              />
            ))}

          {!isSignIn && (
            <ImageDropzone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              error={
                (form.formState.errors as FieldErrors<RegisterFormValues>)
                  .profilePicture
              }
            />
          )}

          <Button
            type="submit"
            className="w-full col-span-2 mt-3 text-white transition-all duration-300 bg-primary hover:brightness-110"
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>

      <p
        className="mt-5 text-sm underline transition-all duration-300 cursor-pointer text-primary hover:brightness-110"
        onClick={toggleSignIn}
      >
        {isSignIn
          ? "Don't have an account? Sign up here"
          : "Already have an account? Sign in here"}
      </p>
    </div>
  );
};

export default LoginForm;
