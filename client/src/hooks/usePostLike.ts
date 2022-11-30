import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { queryClient } from "@/react-query/queryClient";
import { toggleLikeAPI } from "@/apis/post";
import { QUERY_KEYS } from "@/react-query/queryKeys";

interface UsePostLike {
  isLikedState: boolean;
  likeToggleMutation: UseMutationResult<
    void,
    unknown,
    void,
    { previousPosts: unknown }
  >;
}

const usePostLike = ({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked: boolean;
}): UsePostLike => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const likeToggleMutation = useMutation(
    async () => await toggleLikeAPI({ postId, isLiked: isLikedState }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEYS.POSTS]);
        const previousPosts = queryClient.getQueryData([QUERY_KEYS.POSTS]);
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
  return { isLikedState, likeToggleMutation };
};

export default usePostLike;
