import { MouseEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/react-query/queryClient";
import { toggleLikeAPI } from "@/apis/post";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import useAuthStore from "@/store/useAuthStore";

interface UsePostLike {
  isLikedState: boolean;
  toggleLiked: MouseEventHandler;
}

const usePostLike = ({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked?: boolean;
}): UsePostLike => {
  const isLoggedIn = useAuthStore((state) => state.myInfo) !== null;
  const [isLikedState, setIsLikedState] = useState(
    isLiked !== undefined && isLiked
  );

  const toggleLikedMutation = useMutation(
    async () => await toggleLikeAPI({ postId, isLiked: isLikedState }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEYS.POSTS]);
        /*
         *  https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientgetquerydata
         *  only one QUERY_KEYS.POSTS data exists, it's key [0], value [1]
         */
        const previousPosts = queryClient.getQueriesData([
          QUERY_KEYS.POSTS,
        ])[0][1];
        setIsLikedState(!isLikedState);
        return { previousPosts };
      },
      onError: (error, _, previousPosts) => {
        console.error(error);
        queryClient.setQueryData([QUERY_KEYS.POSTS], previousPosts);
        setIsLikedState(!isLikedState);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      },
    }
  );
  const toggleLiked: MouseEventHandler = () => {
    if (typeof isLiked === "undefined" || !isLoggedIn)
      return alert("로그인 후 이용해 주세요");
    toggleLikedMutation?.mutate();
  };
  return { isLikedState, toggleLiked };
};

export default usePostLike;
