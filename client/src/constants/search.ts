export const SEPARATOR: { [key: string]: string } = {
  "#": "tag",
  "@": "category",
  $: "author",
  "+": "likes",
  "^": "reviews",
};

export const DESCRIPTION = [
  { example: "#알고리즘", description: "태그", type: "tag" },
  { example: "$홍길동", description: "유저 닉네임", type: "author" },
  { example: "@리뷰요청", description: "카테고리", type: "category" },
  { example: "+3", description: "좋아요 개수", type: "likes" },
  { example: "^5", description: "리뷰 개수", type: "reviews" },
  { example: "합병 정렬", description: "상세 검색", type: "detail" },
];
