import { SearchFilter } from "@/types/search";

export const parsePostQueryString = (url: URL): SearchFilter => {
  const searchQuery: SearchFilter = {
    lastId: "-1",
    tags: [],
    reviewCount: 0,
    likeCount: 0,
    details: [],
  };

  const tags = url.searchParams.getAll("tags[]");
  if (tags !== null) {
    tags.map((tag) => searchQuery.tags?.push(decodeURI(tag)));
  }

  const details = url.searchParams.getAll("details[]");
  if (details !== null) {
    details.map((detail) => searchQuery.details?.push(decodeURI(detail)));
  }

  const reviews = url.searchParams.get("reviewCount") ?? "0";
  searchQuery.reviewCount = Number(decodeURI(reviews));

  const likes = url.searchParams.get("likeCount") ?? "0";
  searchQuery.likeCount = Number(decodeURI(likes));

  return searchQuery;
};

export const shuffleArray = (
  arr: Array<{ name: string; prev: number }>
): Array<{ name: string; prev: number }> => arr.sort(() => Math.random() - 0.5);
