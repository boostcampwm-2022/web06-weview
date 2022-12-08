import { MouseEventHandler } from "react";
import { InfiniteData, useMutation } from "@tanstack/react-query";

import { queryClient } from "@/react-query/queryClient";
import { toggleLikeAPI } from "@/apis/post";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import useAuth from "@/hooks/useAuth";
import { PostPages } from "@/types/post";
import useSearchStore from "@/store/useSearchStore";

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
  const queryFilters = useSearchStore((state) => [
    state.searchType,
    state.filter,
  ]);
  const isLikedState = isLiked !== undefined && isLiked;
  const { isLoggedIn } = useAuth();

  const toggleLikedMutation = useMutation(
    async () => await toggleLikeAPI({ postId, isLiked: isLikedState }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEYS.POSTS]);
        /*
         *  https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientgetquerydata
         *  only one QUERY_KEYS.POSTS data exists, it's key [0], value [1]
         */
        // Query Key에 따라서 보고 있는 스크롤이 다르기 때문에, 현재 보이는 화면의 스크롤바 데이터를 가져옴
        const previousPosts = queryClient.getQueryData<InfiniteData<PostPages>>(
          [QUERY_KEYS.POSTS, ...queryFilters]
        );

        // 현재 보고 있는 화면의 스크롤바 데이터만 낙관적으로 업데이트
        queryClient.setQueryData<InfiniteData<PostPages>>(
          [QUERY_KEYS.POSTS, ...queryFilters],
          (oldPages) => {
            if (oldPages === undefined) {
              return { pages: [], pageParams: [] };
            }
            return {
              pages: oldPages.pages.map((page) => ({
                ...page,
                posts: page.posts.map((postInfo) =>
                  // 이전 데이터에서 postId 와 일치하는 부분만 상태를 바꿔서 낙관적 업데이트
                  postInfo.id === postId
                    ? {
                        ...postInfo,
                        isLiked: !isLikedState,
                      }
                    : postInfo
                ),
              })),
              pageParams: oldPages.pageParams,
            };
          }
        );

        return { previousPosts };
      },
      onError: (error, _, context) => {
        console.error(error);
        queryClient.setQueryData(
          [QUERY_KEYS.POSTS, ...queryFilters],
          context?.previousPosts
        );
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
