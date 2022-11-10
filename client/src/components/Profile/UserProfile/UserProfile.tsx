import React from "react";

import "./UserProfile.scss";

const UserProfile = (): JSX.Element => {
  // TODO : RQ로 처리하도록 변경
  const user = {
    name: "shyuuuuni",
    avatar_url:
      "https://avatars.githubusercontent.com/u/63703962?s…00&u=77dcbc41de6315d0355e67cca4174dad51a9a50f&v=4",
  };

  return (
    <div className="user-profile">
      <img className="user-profile__image" src={user.avatar_url} />
      <div className="user-profile__name">{user.name}</div>
    </div>
  );
};

export default UserProfile;
