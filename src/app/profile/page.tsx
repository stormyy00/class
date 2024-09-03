import Body from "@/components/profile/Body";
import Protected from "@/components/Protected";
import React from "react";

const page = () => {
  return (
    <div>
      <Protected>
        <Body />
      </Protected>
    </div>
  );
};

export default page;
