import React from "react";

import "./PostMoreModalMenu.scss";

interface PostMoreModalMenuProps {
  text: string;
  onClick?: (e?: Event) => void;
}

const PostMoreModalMenu = ({
  text,
  onClick,
}: PostMoreModalMenuProps): JSX.Element => {
  return (
    <div className="post-more__menu" onClick={() => onClick?.()}>
      {text}
    </div>
  );
};

export default PostMoreModalMenu;
