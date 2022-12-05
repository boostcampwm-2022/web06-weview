import { SearchFilter } from "@/types/search";

export const parsePostQueryString = (url: URL): SearchFilter => {
  const searchQuery: SearchFilter = {
    lastId: "-1",
    tags: [],
    reviewCount: 0,
    likeCount: 0,
    details: [],
  };

  const tags = url.searchParams.get("tags");
  if (tags !== null) {
    searchQuery.tags?.push(...decodeURI(tags).split(","));
  }

  const reviews = url.searchParams.get("reviews") ?? "0";
  searchQuery.reviewCount = Number(decodeURI(reviews));

  const likes = url.searchParams.get("likes") ?? "0";
  searchQuery.likeCount = Number(decodeURI(likes));

  const details = url.searchParams.get("details");
  if (details !== null) {
    searchQuery.details = decodeURI(details).split(",");
  }

  return searchQuery;
};
