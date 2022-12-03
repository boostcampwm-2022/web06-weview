import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";

import "./AuthorProfile.scss";

const AuthorProfile = (): JSX.Element => {
  const { author } = useContext(PostContext);
  // const [isFollowing, setIsFollowing] = useState<boolean>(false);
  //
  // const toggleFollow = (): void => {
  //   setIsFollowing((isFollowing) => !isFollowing);
  // };

  return (
    <div className="post__title__author-profile">
      <img
        className="post__title__author-profile__image"
        src={author.profileUrl}
      />
      <div className="post__title__author-profile__username">
        {author.nickname}
      </div>
      {/* <button */}
      {/*  className={`post__title__author-profile__follow-button${ */}
      {/*    isFollowing ? "--on" : "" */}
      {/*  }`} */}
      {/*  onClick={toggleFollow} */}
      {/* > */}
      {/*  {isFollowing ? "팔로우 취소" : "팔로잉"} */}
      {/* </button> */}
    </div>
  );
};

export default AuthorProfile;
