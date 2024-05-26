import Link from "next/link";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const HeaderNav = () => {
  return (
    <div className="ml-auto flex gap-4">
      <Link
        className="flex gap-1 items-center font-medium  bg-emerald-600 text-stone-50 py-2 px-2 rounded-[4px]"
        href="/signin"
      >
        Login
      </Link>
    </div>
  );
};

export default HeaderNav;
