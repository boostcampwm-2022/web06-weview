import React from "react";
import { PostInfo } from "@/types/post";
import "./Post.scss";

interface PostProps {
  postInfo: PostInfo;
}

const Post = ({ postInfo }: PostProps): JSX.Element => {
  const { id, title, content, imageUrls, user, code, updatedAt } = postInfo;

  const getTimeDiff = (): number => {
    const now = new Date();
    const time = new Date(updatedAt);
    return now.getTime() - time.getTime();
  };

  return (
    <div className="post">
      <div className="post__title">
        <div className="author-profile">
          <img className="author-profile__image" src={user.profileUrl} />
          <div className="author-profile__username">{user.username}</div>
        </div>
        <div className="post__title__history">
          경과된 시간 : {getTimeDiff()}
        </div>
      </div>
      <div className="post__code-info">{code}</div>
      <div className="post__code-image">
        {imageUrls.map((imageUrl, index) => (
          <img className="post__code-image__image" key={index} src={imageUrl} />
        ))}
      </div>
      <div className="post__body">{`${id},${title},${content}`}</div>
    </div>
  );
};

export default Post;
