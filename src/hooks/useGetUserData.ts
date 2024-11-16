import useAppStore from "@/state/useStore";
import { fetchUserById } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useGetUserData = (forceMyUser?: boolean) => {
  const { id } = useParams();
  const myUserId = useAppStore((state) => state.idUser);

  const targetId = forceMyUser ? myUserId : id || myUserId;

  return useQuery({
    queryKey: ["user", targetId],
    queryFn: () => fetchUserById(targetId as string),
    enabled: !!targetId,
  });
};

export default useGetUserData;
