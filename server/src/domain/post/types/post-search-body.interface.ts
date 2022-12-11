interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  authorNickname: string;
  tags: string;
  likeCount: number;
  reviewCount: number;
  lineCount: number;
}

interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
