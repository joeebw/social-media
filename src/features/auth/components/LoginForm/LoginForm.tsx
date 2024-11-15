import * as z from "zod";
import { FieldErrors } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import ImageDropzone from "@/components/ImageDropzone";
import {
  SIGNIN_FIELDS,
  SIGNUP_FIELDS,
} from "@/features/auth/constants/formFields";
import useAppStore from "@/state/useStore";
import { registerSchema } from "@/features/auth/hooks/useHandleLogin";
import useAuth from "@/features/auth/hooks/useHandleLogin";
import LoadingButton from "@/components/LoadingButton";

export type RegisterFormValues = z.infer<typeof registerSchema>;

const LoginForm = () => {
  const isSignIn = useAppStore((state) => state.isSignIn);
  const toggleSignIn = useAppStore((state) => state.toggleSignIn);
  const { form, handleFileSelect, handleSubmit, selectedFile } = useAuth();

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
            <div className="col-span-2">
              <ImageDropzone
                dropzoneText="Drag and drop a profile picture, or click to select"
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                error={
                  (form.formState.errors as FieldErrors<RegisterFormValues>)
                    .profilePicture
                }
              />
            </div>
          )}

          <LoadingButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            messageLoading="Loading..."
            className="w-full col-span-2 mt-3 text-white transition-all duration-300 bg-primary hover:brightness-110"
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </LoadingButton>
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
