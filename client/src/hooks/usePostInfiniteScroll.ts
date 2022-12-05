import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { fetchPost } from "@/apis/post";
import { PostPages } from "@/types/post";
import useSearchStore from "@/store/useSearchStore";
import { queryClient } from "@/react-query/queryClient";
import { QUERY_KEYS } from "@/react-query/queryKeys";

interface PostInfiniteScrollResults {
  data: InfiniteData<PostPages> | undefined;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PostPages, unknown>>;
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
}

/**
 * react-query 를 이용한 포스트 정보에 대한 인피니티 스크롤 커스텀 훅 입니다.
 */
const usePostInfiniteScroll = (): PostInfiniteScrollResults => {
  const [searchQuery] = useSearchStore((state) => [state.searchQuery]);

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    async ({ pageParam = -1 }: QueryFunctionContext) =>
      await fetchPost(pageParam),
    {
      getNextPageParam: (lastPost) =>
        lastPost.isLast ? undefined : lastPost.lastId,
    }
  );

  /**
   * searchQuery 값이 변경되면 다시 로딩합니다.
   */
  useEffect(() => {
    void (async () => {
      await queryClient.resetQueries(
        { queryKey: [QUERY_KEYS.POSTS], exact: true },
        { cancelRefetch: true }
      );
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.HISTORY],
        type: "active",
      });
    })();
  }, [searchQuery]);

  /**
   * Intersection Observer 를 위한 콜백 함수
   * 다음 페이지를 로딩해야 하는 상황을 감지했을 때 fetchPost 요청을 보내서 가져옵니다.
   */
  const onIntersect = useCallback(
    (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver
    ): void => {
      observer.unobserve(entry.target);
      if (hasNextPage === true && !isFetching) {
        fetchNextPage()
          .then(() => {})
          .catch((e) => {});
      }
    },
    [hasNextPage, isFetching, fetchNextPage]
  );

  return { data, hasNextPage, isFetching, fetchNextPage, onIntersect };
};

export default usePostInfiniteScroll;
