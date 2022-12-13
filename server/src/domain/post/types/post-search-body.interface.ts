interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  createdat: Date;
  updatedat: Date;
  authorid: number;
  authornickname: string;
  tags: string;
  likecount: number;
  reviewcount: number;
  linecount: number;
}

interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
