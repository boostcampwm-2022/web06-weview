interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  createdat: Date;
  updatedat: Date;
  userid: number;
  usernickname: string;
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
