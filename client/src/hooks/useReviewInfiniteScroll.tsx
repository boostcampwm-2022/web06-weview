import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryFunctionContext,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

import { QUERY_KEYS } from "@/react-query/queryKeys";
import { getReviewsAPI } from "@/apis/review";
import { ReviewPages } from "@/types/review";

export type Refetch = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => Promise<QueryObserverResult<InfiniteData<ReviewPages>, unknown>>;

interface ReviewInfiniteScrollResults {
  data: InfiniteData<ReviewPages> | undefined;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ReviewPages, unknown>>;
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
  refetch: Refetch;
}

/**
 * react-query 를 이용한 리뷰 정보에 대한 인피니티 스크롤 커스텀 훅 입니다.
 */
const useReviewInfiniteScroll = (
  postId: string
): ReviewInfiniteScrollResults => {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      [QUERY_KEYS.REVIEWS, postId],
      async ({ pageParam = -1 }: QueryFunctionContext) =>
        await getReviewsAPI(postId, pageParam),
      {
        getNextPageParam: (lastReview) =>
          lastReview.isLast ? undefined : lastReview.lastId,
      }
    );

  /**
   * 다음 리뷰들을 불러오는 상황에 사용하면 동작합니다.
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
          .catch((e) => {
            alert(e.message);
          });
      }
    },
    [hasNextPage, isFetching, fetchNextPage]
  );

  return { data, hasNextPage, isFetching, fetchNextPage, onIntersect, refetch };
};

export default useReviewInfiniteScroll;
