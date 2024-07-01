import dynamic from "next/dynamic";
import React from "react";

const CurrentUserMinders = () => {
  return <div>CurrentUserMinders</div>;
};

export default dynamic(() => Promise.resolve(CurrentUserMinders), {
  ssr: false,
});
