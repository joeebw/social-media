import { AppHeader, LoginForm } from "@/features/auth";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-full px-4 pb-9 sm:px-0">
      <AppHeader />

      <div className="flex justify-center mt-7 sm:mt-14">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
