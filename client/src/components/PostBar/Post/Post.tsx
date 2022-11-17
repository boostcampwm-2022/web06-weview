import React, { createContext, RefObject } from "react";
import "./Post.scss";
import { PostInfo } from "@/types/post";
import PostTitle from "@/components/PostBar/Post/PostTitle/PostTitle";
import PostSummary from "./PostSummary/PostSummary";
import PostImageSlider from "@/components/PostBar/Post/PostImageSlider/PostImageSlider";
import PostBody from "@/components/PostBar/Post/PostBody/PostBody";
import PostFooter from "@/components/PostBar/Post/PostFooter/PostFooter";
import useRelativeSize from "@/hooks/useRelativeSize";

interface PostProps {
  postInfo: PostInfo;
  boxRef: RefObject<HTMLDivElement>;
}

export const PostContext = createContext<PostInfo>({} as PostInfo);

const Post = ({ postInfo, boxRef }: PostProps): JSX.Element => {
  const { windowSize } = useRelativeSize({
    targetRef: boxRef,
    minHeight: 693,
    heightRatio: 1.54,
    windowRatio: 0.9,
  });

  return (
    <PostContext.Provider value={postInfo}>
      <div className="post" style={windowSize}>
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
