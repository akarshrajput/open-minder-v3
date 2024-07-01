import { Spinner } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="size-8 animate-spin" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Loader), { ssr: false });
