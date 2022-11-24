import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { postReviewAPI } from "@/apis/review";
import useAuthStore from "@/store/useAuthStore";
import NotLoggedInReviewForm from "@/components/Modal/ReviewModal/ReviewContainer/ReviewForm/NotLoggedInReviewForm";

interface ReviewFormProps {
  postId: string;
}

const reviewTextAreaPlaceholder = "리뷰를 입력해주세요.";

const ReviewForm = ({ postId }: ReviewFormProps): JSX.Element => {
  const [myInfo, isLoggedIn] = useAuthStore((state) => [
    state.myInfo,
    state.isLoggedIn,
  ]);
  const [content, setContent] = useState("");

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setContent(e.target.value);
    },
    [setContent]
  );

  const handleReviewSubmit = useCallback(
    (e: SyntheticEvent): void => {
      e.preventDefault(); // 새로고침 방지
      if (content === "") {
        return;
      }
      postReviewAPI(postId, content)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [content]
  );

  if (!isLoggedIn) {
    return <NotLoggedInReviewForm />;
  }

  return (
    <>
      <form className="review-form" onSubmit={handleReviewSubmit}>
        <div className="review-form__header">
          <img
            className="review-form__header--profile-image"
            src={myInfo?.profileUrl}
          />
          <div className="review-form__header--username">
            {myInfo?.nickname}
          </div>
        </div>
        <textarea
          className="review-form__content"
          value={content}
          onChange={handleContentChange}
          placeholder={reviewTextAreaPlaceholder}
        ></textarea>
        <div className="review-form__footer">
          <button className="review-form__footer--submit-button" type="submit">
            제출
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
