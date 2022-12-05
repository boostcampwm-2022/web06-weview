import React from "react";

import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  className?: string;
  isSmall?: boolean;
}

const LoadingSpinner = ({
  className,
  isSmall = false,
}: LoadingSpinnerProps): JSX.Element => {
  return (
    <div className={`loading-spinner ${className ?? ""}`}>
      <div
        className={`loading-spinner__spinner ${isSmall ? "small" : ""}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
