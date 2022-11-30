import React from "react";

import useCodeEditorStore from "@/store/useCodeEditorStore";

import "./SnapShotNav.scss";

const SnapShotNav = (): JSX.Element => {
  const { images } = useCodeEditorStore((state) => ({
    images: state.images,
  }));

  return (
    <nav className="snapshot">
      {images.map((src, index) => (
        <div key={index} className={"snapshot__item"}>
          <img className={"snapshot__item--img"} src={src} />
        </div>
      ))}
    </nav>
  );
};

export default SnapShotNav;
