import Link from "next/link";
import React from "react";

const BaseSpecialButton = ({ className, children, href = "" }) => {
  return (
    <div>
      <Link
        href={href}
        className={`${className} flex gap-1 font-semibold items-center bg-stone-800 text-stone-100 py-1 px-2 rounded-[4px]`}
      >
        {children}
      </Link>
    </div>
  );
};

export default BaseSpecialButton;
