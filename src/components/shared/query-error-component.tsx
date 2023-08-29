import * as React from "react";

const QueryErrorComponent = () => {
  return (
    <div className="w-full flex justify-center ">
      <span className="text-destructive">
        Something went wrong, please try again later.
      </span>
    </div>
  );
};

export default QueryErrorComponent;
