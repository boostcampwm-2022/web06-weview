import React from "react";
import { PostInfo } from "@/types/post";

interface PostProps {
  postInfo: PostInfo;
}

const Post = ({ postInfo }: PostProps): JSX.Element => {
  const { id, title, contents, imageUrls, user, tags, reviews } = postInfo;

  return (
    <div>
      {`${id}, ${title}, ${contents}`}
      {imageUrls.map((url) => `${url}`).join(",")}
      {tags.map((tag) => `${tag}`).join(",")}
      {user.id}
      {reviews
        .map(
          (review) => `${review?.id}/${review?.user?.id}/${review?.contents}`
        )
        .join(",")}
    </div>
  );
};

export default Post;
