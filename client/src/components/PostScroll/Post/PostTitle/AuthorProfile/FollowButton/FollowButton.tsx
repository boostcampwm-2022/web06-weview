import React, { useState } from "react";

import "./FollowButton.scss";

const FollowButton = (): JSX.Element => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const toggleFollow = (): void => {
    setIsFollowing((isFollowing) => !isFollowing);
  };

  return (
    <button
      className={isFollowing ? "follow-button--is-following" : "follow-button"}
      onClick={toggleFollow}
    >
      {isFollowing ? "팔로우 취소" : "팔로잉"}
    </button>
  );
};

export default FollowButton;
