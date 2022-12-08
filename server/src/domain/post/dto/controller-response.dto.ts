export class InquiryUsingFilterDto {
  posts: PostDtoUsingInquiryUsingFilter[];
  lastId: number;
  isLast: boolean;
}

export class PostDtoUsingInquiryUsingFilter {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  images: ImageDtoUsingInquiryUsingFilter[];
  updatedAt: string;
  author: AuthorDtoUsingInquiryUsingFilter[];
  tags: string[];
  reviews: ReviewDtoUsingInquiryUsingFilter[];
}

export class ImageDtoUsingInquiryUsingFilter {
  src: string;
  name: string;
}

export class AuthorDtoUsingInquiryUsingFilter {
  id: number;
  nickname: string;
  profileUrl: string;
  email: string;
}

export class ReviewDtoUsingInquiryUsingFilter {
  id: number;
  reviewers: ReviewerDtoUsingInquiryUsingFilter[];
  content: string;
  updatedAt: string;
}

export class ReviewerDtoUsingInquiryUsingFilter {
  id: number;
  nickname: string;
  profileUrl: string;
  email: string;
}
