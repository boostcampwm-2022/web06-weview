import { SearchQuery } from "@/types/search";

export const parsePostQueryString = (url: URL): any => {
  const searchQuery: SearchQuery = {
    tags: [],
    authors: [],
    category: "",
    reviews: 0,
    likes: 0,
    detail: "",
  };

  const tags = url.searchParams.get("tags");
  if (tags !== null) {
    searchQuery.tags?.push(...decodeURI(tags).split(","));
  }

  const authors = url.searchParams.get("authors");
  if (authors !== null) {
    searchQuery.authors?.push(...decodeURI(authors).split(","));
  }

  const category = url.searchParams.get("category") ?? "";
  searchQuery.category = decodeURI(category);

  const reviews = url.searchParams.get("reviews") ?? "0";
  searchQuery.reviews = Number(decodeURI(reviews));

  const likes = url.searchParams.get("likes") ?? "0";
  searchQuery.likes = Number(decodeURI(likes));

  const detail = url.searchParams.get("detail") ?? "";
  searchQuery.detail = decodeURI(detail);

  return searchQuery;
};
