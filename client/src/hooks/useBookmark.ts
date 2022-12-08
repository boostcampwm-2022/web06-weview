import { InfiniteData, useMutation } from "@tanstack/react-query";
import { MouseEventHandler } from "react";

import useAuth from "@/hooks/useAuth";
import { queryClient } from "@/react-query/queryClient";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { addBookmarkPost, removeBookmarkPost } from "@/apis/bookmark";
import { PostPages } from "@/types/post";
import useSearchStore from "@/store/useSearchStore";

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
  const queryFilters = useSearchStore((state) => [
    state.searchType,
    state.filter,
  ]);
  const isBookmarkedState = isBookmarked !== undefined && isBookmarked;
  const { isLoggedIn } = useAuth();

  // 북마크 토글을 시도하고, 실패하면 원래 상태로 롤백하는 로직
  const useOptimisticMutation = useMutation(
    isBookmarkedState
      ? async () => await removeBookmarkPost(postId)
      : async () => await addBookmarkPost(postId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEYS.POSTS]);

        // Query Key에 따라서 보고 있는 스크롤이 다르기 때문에, 현재 보이는 화면의 스크롤바 데이터를 가져옴
        const cache = queryClient.getQueryData<InfiniteData<PostPages>>([
          QUERY_KEYS.POSTS,
          ...queryFilters,
        ]);

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
                        isBookmarked: !isBookmarkedState,
                      }
                    : postInfo
                ),
              })),
              pageParams: oldPages.pageParams,
            };
          }
        );

        return { cache };
      },
      onError: (error, value, context) => {
        // mutation 실패 시 변경 전 데이터로 되돌린다.
        console.log("북마크 변경 실패", error);
        queryClient.setQueryData(
          [QUERY_KEYS.POSTS, ...queryFilters],
          context?.cache
        );
      },
      onSuccess: async () => {
        // mutation 성공 시 서버 상태가 변경되었으므로 모든 포스트 스크롤에 대해 최신화를 진행
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
