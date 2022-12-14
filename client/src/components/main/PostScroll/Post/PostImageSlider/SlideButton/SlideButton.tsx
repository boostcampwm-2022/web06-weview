import React, { FC } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { ARROW_ICON_STYLE } from "@/constants/style";

import "./SlideButton.scss";

interface SlideButtonProps {
  isFirst: boolean;
  isLast: boolean;
  handlePrevImage: () => void;
  handleNextImage: () => void;
}

const SlideButton: FC<SlideButtonProps> = ({
  isFirst,
  isLast,
  handlePrevImage,
  handleNextImage,
}) => {
  return (
    <>
      {!isFirst && (
        <button className="prev-button" onClick={handlePrevImage}>
          <ArrowBackIosOutlinedIcon sx={ARROW_ICON_STYLE} />
        </button>
      )}
      {!isLast && (
        <button className="next-button" onClick={handleNextImage}>
          <ArrowForwardIosOutlinedIcon sx={ARROW_ICON_STYLE} />
        </button>
      )}
    </>
  );
};

export default SlideButton;
