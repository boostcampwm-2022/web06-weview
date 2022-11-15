export class InqueryUsingFilterDto {
  posts: PostDtoUsingInqueryUsingFilter[];
  lastId: number;
  isLast: boolean;
}

export class PostDtoUsingInqueryUsingFilter {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  images: ImageDtoUsingInqueryUsingFilter[];
  updatedAt: string;
  author: AuthorDtoUsingInqueryUsingFilter[];
  tags: string[];
  reviews: ReviewDtoUsingInqueryUsingFilter[];
}

export class ImageDtoUsingInqueryUsingFilter {
  src: string;
  name: string;
}

export class AuthorDtoUsingInqueryUsingFilter {
  id: number;
  nickname: string;
  profileUrl: string;
  email: string;
}

export class ReviewDtoUsingInqueryUsingFilter {
  id: number;
  reviewers: ReviewerDtoUsingInqueryUsingFilter[];
  content: string;
  updatedAt: string;
}

export class ReviewerDtoUsingInqueryUsingFilter {
  id: number;
  nickname: string;
  profileUrl: string;
  email: string;
}
