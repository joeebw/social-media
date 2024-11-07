import { useEffect } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAppStore from "@/state/useStore";
import userService from "@/features/navBar/services/userService";

const useAuthStateChanged = () => {
  const setIdUser = useAppStore((state) => state.setIdUser);
  const setUser = useAppStore((state) => state.setUser);

  const populateUserData = async (id: string) => {
    const user = await userService.fetchUser(id);
    console.log("user: ", user);
    setUser(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIdUser(user.uid);
        populateUserData(user.uid);
      } else {
        setIdUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthStateChanged;
