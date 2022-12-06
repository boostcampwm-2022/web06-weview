import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { queryClient } from "@/react-query/queryClient";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { addBookmarkPost, removeBookmarkPost } from "@/apis/bookmark";

interface UseBookmark {
  postId: string;
  isBookmarked?: boolean;
}

interface UseBookmarkResult {
  isBookmarkedState: boolean;
  toggleBookmark: MouseEventHandler;
}

const useBookmark = ({
  postId,
  isBookmarked,
}: UseBookmark): UseBookmarkResult => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(
    isBookmarked !== undefined && isBookmarked
  );
  const { isLoggedIn } = useAuth();

  // 북마크 토글을 시도하고, 실패하면 원래 상태로 롤백하는 로직
  const useOptimisticMutation = useMutation(
    isBookmarkedState
      ? async () => await removeBookmarkPost(postId)
      : async () => await addBookmarkPost(postId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEYS.POSTS]);
        const previousPosts = queryClient.getQueryData([QUERY_KEYS.POSTS]);
        setIsBookmarkedState(!isBookmarkedState);
        return { previousPosts };
      },
      onError: (error, value, context) => {
        console.log(error);
        queryClient.setQueryData([QUERY_KEYS.POSTS], context?.previousPosts);
        setIsBookmarkedState(isBookmarkedState);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      },
    }
  );

  const toggleBookmark: MouseEventHandler = () => {
    if (isBookmarked === undefined || !isLoggedIn) {
      return alert("로그인 후 이용해 주세요");
    }
    useOptimisticMutation.mutate();
  };

  return { isBookmarkedState, toggleBookmark };
};

export default useBookmark;
