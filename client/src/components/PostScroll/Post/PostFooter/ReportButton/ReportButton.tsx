import React, { MouseEventHandler, useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SvgIconButton from "@/components/CommonButtons/SvgIconButton/SvgIconButton";

const errorColor = "#f45452";
const textColor = "#222222";

const ReportButton = (): JSX.Element => {
  const [reported, setReported] = useState(false);

  const handleReport: MouseEventHandler = () => {
    console.log("신고하기");
    setReported((reported) => !reported);
  };

  return (
    <SvgIconButton
      Icon={ThumbDownIcon}
      detail="신고하기"
      onClick={handleReport}
      className="post__footer__left-block--btn"
      color={`${reported ? errorColor : textColor}`}
    />
  );
};

export default ReportButton;
