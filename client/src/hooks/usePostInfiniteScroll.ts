import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

import { PostPages } from "@/types/post";
import useSearchStore, { SEARCH_FILTER } from "@/store/useSearchStore";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import {
  fetchBookmarkPost,
  fetchPost,
  fetchSinglePost,
  fetchUserPost,
} from "@/apis/post";
import { queryClient } from "@/react-query/queryClient";

const getQueryFn = async (
  pageParam: string,
  searchType: SEARCH_FILTER
): Promise<PostPages> => {
  if (searchType === SEARCH_FILTER.AUTHOR) {
    const postPages = await fetchUserPost(pageParam);
    return postPages;
  }
  if (searchType === SEARCH_FILTER.BOOKMARK) {
    const postPages = await fetchBookmarkPost(pageParam);
    return postPages;
  }
  if (searchType === SEARCH_FILTER.SINGLE) {
    const postPages = await fetchSinglePost(pageParam);
    return postPages;
  }
  // default
  const postPages = await fetchPost(pageParam);
  if (pageParam === "-1") {
    // 최근 검색어 불러오기
    await queryClient.refetchQueries(
      { queryKey: [QUERY_KEYS.HISTORY] },
      { cancelRefetch: true }
    );
  }
  return postPages;
};

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
  const [searchType, filter] = useSearchStore((state) => [
    state.searchType,
    state.filter,
  ]);
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS, searchType, filter],
    async ({ pageParam = -1, queryKey }: QueryFunctionContext) =>
      await getQueryFn(String(pageParam), queryKey[1] as SEARCH_FILTER), // lastId, 검색 타입
    {
      getNextPageParam: (lastPost) =>
        lastPost.isLast ? undefined : lastPost.lastId,
      staleTime: 1000 * 60, // 1분
      suspense: true,
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
