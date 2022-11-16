import React, { createContext } from "react";
import "./Post.scss";
import { PostInfo } from "@/types/post";
import PostTitle from "@/components/PostBar/Post/PostTitle/PostTitle";
import PostSummary from "./PostSummary/PostSummary";
import PostImageSlider from "@/components/PostBar/Post/PostImageSlider/PostImageSlider";
import PostBody from "@/components/PostBar/Post/PostBody/PostBody";
import PostFooter from "@/components/PostBar/Post/PostFooter/PostFooter";

interface PostProps {
  postInfo: PostInfo;
}

export const PostContext = createContext<PostInfo>({} as PostInfo);

const Post = ({ postInfo }: PostProps): JSX.Element => {
  return (
    <PostContext.Provider value={postInfo}>
      <div className="post">
        <PostTitle />
        <PostSummary />
        <PostImageSlider />
        <PostBody />
        <PostFooter />
      </div>
    </PostContext.Provider>
  );
};

export default Post;
