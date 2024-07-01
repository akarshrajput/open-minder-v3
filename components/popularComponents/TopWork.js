import dynamic from "next/dynamic";
import React from "react";

const TopWork = () => {
  return <div>TopWork</div>;
};

export default dynamic(() => Promise.resolve(TopWork), { ssr: false });
