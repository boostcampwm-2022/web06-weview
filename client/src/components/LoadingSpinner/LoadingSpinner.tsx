import React from "react";

import "./LoadingSpinner.scss";

const LoadingSpinner = (): JSX.Element => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
