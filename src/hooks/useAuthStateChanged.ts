import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAppStore from "@/state/useStore";

const useAuthStateChanged = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setIdUser = useAppStore((state) => state.setIdUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIdUser(user.uid);
      } else {
        setIdUser(null);
      }

      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading };
};

export default useAuthStateChanged;
