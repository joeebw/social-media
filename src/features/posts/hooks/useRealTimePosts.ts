import { useEffect, useState, useRef } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import {
  db,
  subscribeToAllPosts,
  subscribeToUserPosts,
} from "@/utils/firebase";
import { Post } from "@/ts/post.types";

const POSTS_PER_PAGE = 4;

export const useRealtimePosts = (userId?: string) => {
  const queryClient = useQueryClient();
  const isUserPosts = !!userId;
  const queryKey = isUserPosts ? ["user posts", userId] : ["home posts"];

  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadedPostsCount = useRef(0);

  const handleNewPosts = (snapshot: any, newPosts: Post[]) => {
    if (loadedPostsCount.current > 0) {
      const allPosts = [...newPosts].sort((a, b) => b.datePost - a.datePost);
      const postsToShow = allPosts.slice(0, loadedPostsCount.current);

      queryClient.setQueryData(queryKey, postsToShow);
      setHasMore(newPosts.length > loadedPostsCount.current);

      if (postsToShow.length > 0) {
        const lastPostId = postsToShow[postsToShow.length - 1].id;
        const lastDocSnapshot = snapshot.docs.find(
          (doc: DocumentSnapshot) => doc.id === lastPostId
        );
        setLastDoc(lastDocSnapshot || null);
      }
    } else {
      const initialPosts = newPosts.slice(0, POSTS_PER_PAGE);
      queryClient.setQueryData(queryKey, initialPosts);
      loadedPostsCount.current = POSTS_PER_PAGE;

      if (initialPosts.length > 0) {
        const lastPostId = initialPosts[initialPosts.length - 1].id;
        const lastDocSnapshot = snapshot.docs.find(
          (doc: DocumentSnapshot) => doc.id === lastPostId
        );
        setLastDoc(lastDocSnapshot || null);
      }
      setHasMore(newPosts.length > POSTS_PER_PAGE);
    }
  };

  useEffect(() => {
    const unsubscribe = isUserPosts
      ? subscribeToUserPosts(userId, (newPosts, snapshot) => {
          handleNewPosts(snapshot, newPosts);
        })
      : subscribeToAllPosts((newPosts, snapshot) => {
          handleNewPosts(snapshot, newPosts);
        });

    return () => unsubscribe();
  }, [queryClient, userId, isUserPosts]);

  const loadMorePosts = async () => {
    if (!hasMore || isLoadingMore || !lastDoc) return;

    setIsLoadingMore(true);
    try {
      const postsRef = collection(db, "postsWolfstream");

      const constraints: QueryConstraint[] = [];

      if (isUserPosts && userId) {
        constraints.push(where("userId", "==", userId));
      }

      constraints.push(orderBy("datePost", "desc"));
      constraints.push(startAfter(lastDoc));
      constraints.push(limit(POSTS_PER_PAGE));

      const q = query(postsRef, ...constraints);

      const snapshot = await getDocs(q);

      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      if (newPosts.length > 0) {
        const hasMorePosts = newPosts.length > 0;
        const postsToAdd = newPosts.slice(0, POSTS_PER_PAGE);

        const currentPosts = queryClient.getQueryData<Post[]>(queryKey) ?? [];
        const updatedPosts = [...currentPosts, ...postsToAdd];

        queryClient.setQueryData(queryKey, updatedPosts);
        loadedPostsCount.current = updatedPosts.length;

        setLastDoc(snapshot.docs[postsToAdd.length - 1]);
        setHasMore(hasMorePosts);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const reactQuery = useQuery<Post[]>({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey) ?? [],
    select: (data: Post[]) => {
      return [...data].sort((a, b) => b.datePost - a.datePost);
    },
  });

  return {
    ...reactQuery,
    loadMorePosts,
    hasMore,
    isLoadingMore,
  };
};
