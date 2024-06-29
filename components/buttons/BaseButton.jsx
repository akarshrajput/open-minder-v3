import Link from "next/link";
import React from "react";

const BaseButton = ({ className, children, href = "" }) => {
  return (
    <div>
      <Link
        href={href}
        className={`${className} flex gap-1 font-semibold items-center dark:bg-stone-800 bg-stone-200  py-1 px-2 rounded-[4px]`}
      >
        {children}
      </Link>
    </div>
  );
};

export default BaseButton;
