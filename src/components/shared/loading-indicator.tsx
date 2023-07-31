import * as React from "react";

const LoadingIndicator = () => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
