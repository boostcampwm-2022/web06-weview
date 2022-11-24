import { User } from 'src/domain/user/user.entity';
import { Review } from '../review.entity';

class ReviewerInReview {
  id: number;

  nickname: string;

  profileUrl: string;

  email: string;

  constructor(reviewer: User) {
    this.id = reviewer.id;
    this.nickname = reviewer.nickname;
    this.profileUrl = reviewer.profileUrl;
    this.email = reviewer.email;
  }
}

class ReviewInReviewList {
  id: number;

  reviewer: ReviewerInReview;

  content: string;

  updatedAt: Date;

  constructor(review: Review) {
    this.id = review.id;
    this.reviewer = new ReviewerInReview(review.user);
    this.content = review.content;
    this.updatedAt = review.updatedAt;
  }
}

export class ReviewListResponseDto {
  reviews: ReviewInReviewList[];

  lastId: number;

  isLast: boolean;

  constructor(reviews: Review[], lastId: number, isLast: boolean) {
    this.reviews = reviews.map((review) => new ReviewInReviewList(review));
    this.lastId =
      reviews && reviews.length > 0 ? reviews.slice(-1)[0].id : lastId;
    this.isLast = isLast;
  }
}
