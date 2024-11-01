import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInputField from "@/features/auth/components/FormInputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const SIGNIN_FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const LoginForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleSignIn = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const handleSignUp = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-[47rem] rounded-lg shadow-md p-9 bg-secondaryBackground">
      <p className="font-medium text-text">
        Welcome to WolfStream, Sign in to start streaming your favorite content!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(isSignIn ? handleSignIn : handleSignUp)}
          className="mt-5 space-y-6"
        >
          {SIGNIN_FIELDS.map((field) => (
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
            />
          ))}

          <Button
            type="submit"
            className="w-full text-white transition-all duration-300 bg-primary hover:brightness-110"
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>

      <p
        className="mt-5 text-sm underline transition-all duration-300 cursor-pointer text-primary hover:brightness-110"
        onClick={() => {
          setIsSignIn(!isSignIn);
        }}
      >
        Don't have an account? Sign up here
      </p>
    </div>
  );
};

export default LoginForm;
