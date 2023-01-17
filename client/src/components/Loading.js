import React from "react";

const Loading = ({ size }) => {
  return (
    <div
      className={`${size} font-medium text-secondary animate-pulse`}
      role="status"
    >
      Loading...
    </div>
  );
};

export default Loading;
