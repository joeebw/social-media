import useAppStore from "@/state/useStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "@/features/user/services/userService";

const useGetUserData = (forceMyUser?: boolean) => {
  const { id } = useParams();
  const myUserId = useAppStore((state) => state.idUser);

  const targetId = forceMyUser ? myUserId : id || myUserId;

  return useQuery({
    queryKey: ["user", targetId],
    queryFn: () => userService.fetchUserById(),
    enabled: !!targetId,
  });
};

export default useGetUserData;
