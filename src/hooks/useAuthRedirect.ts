import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAppStore from "@/state/useStore";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const setIdUser = useAppStore((state) => state.setIdUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIdUser(user.uid);
        navigate("/home");
      } else {
        setIdUser(null);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthRedirect;
