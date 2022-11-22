import React from "react";

import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps): JSX.Element => {
  return (
    <div className={`loading-spinner ${className ?? ""}`}>
      <div className="loading-spinner__spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
