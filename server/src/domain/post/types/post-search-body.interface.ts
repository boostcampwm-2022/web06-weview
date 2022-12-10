interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  language: string;
  authorId: number;
  authorNickname: string;
  tags: string;
}

interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
