interface PostSearchBody {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  // TODO 이미지 url은 필요없음. 가져올거임
  createdAt: Date;
  updatedAt: Date;
  authorId: number; // TODO Author 관해서도 가져올거임
  authorNickname: string;
  tags: string;
  // likesCount: number;
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
