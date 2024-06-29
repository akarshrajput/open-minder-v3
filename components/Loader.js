import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="size-8 animate-spin" />
    </div>
  );
};

export default Loader;
