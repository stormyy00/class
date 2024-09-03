import React from "react";
import Header from "./Header";
import Display from "./Display";

const Body = () => {
  return (
    <div className="my-5 flex h-full flex-col items-center gap-5 p-3">
      <div className="flex w-9/12 justify-center rounded-lg border-b-4 border-black">
        <Header />
      </div>
      <Display />
    </div>
  );
};

export default Body;
