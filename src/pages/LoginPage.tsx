import AppHeader from "@/features/auth/components/AppHeader";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-full">
      <AppHeader />

      <div className="flex justify-center mt-14">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
