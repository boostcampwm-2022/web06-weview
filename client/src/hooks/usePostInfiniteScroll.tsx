import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchPost } from "@/apis/post";
import { PostScroll } from "@/types/post";
import { useCallback } from "react";

interface PostInfiniteScrollResults {
  data: InfiniteData<PostScroll> | undefined;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PostScroll, unknown>>;
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
}

/**
 * react-query 를 이용한 포스트 정보에 대한 인피니티 스크롤 커스텀 훅 입니다.
 */
const usePostInfiniteScroll = (): PostInfiniteScrollResults => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = -1 }: QueryFunctionContext) =>
      await fetchPost({
        lastId: pageParam,
      }),
    {
      getNextPageParam: (lastPost) =>
        lastPost.isLast ? undefined : lastPost.lastId,
    }
  );

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
