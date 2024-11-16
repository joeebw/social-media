import { useEffect } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAppStore from "@/state/useStore";

const useAuthStateChanged = () => {
  const setIdUser = useAppStore((state) => state.setIdUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIdUser(user.uid);
      } else {
        setIdUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthStateChanged;
