import Link from "next/link";
import React from "react";
import { auth } from "@lib/auth";

const HeaderNav = async () => {
  const session = await auth();
  // console.log(session);
  return (
    <div className="ml-auto flex gap-4">
      <Link
        className="flex gap-1 items-center font-medium  bg-emerald-600 text-stone-50 py-2 px-2 rounded-[4px]"
        href="/subscription"
      >
        Subscribe
      </Link>
      {session?.user?.image ? (
        <Link href={`/${session.user.username}`}>
          <img
            src={session.user.image}
            className="rounded-full w-10"
            alt={session.user.name}
            referrerPolicy="no-referrer"
          />
        </Link>
      ) : (
        <Link
          className="flex gap-1 items-center font-medium  bg-emerald-600 text-stone-50 py-2 px-2 rounded-[4px]"
          href="/login"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default HeaderNav;
