import { LockClosedIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { auth } from "@lib/auth";
import Link from "next/link";
import DarkModeBtn from "./buttons/DarkModeBtn";

const HeaderNav = async () => {
  const session = await auth();
  return (
    <div className="ml-auto flex items-center gap-4">
      <Link
        className="flex gap-1  items-center font-semibold dark:bg-stone-800 bg-stone-200  py-1 px-2 rounded-md"
        href="/minderai"
      >
        <p>Minder AI</p>
        <SparklesIcon className="size-4" />
      </Link>
      <DarkModeBtn />
      {session?.user ? (
        <Link href="/me">
          <img
            className="h-9 border border-stone-800 rounded-full"
            src={session?.user?.image}
            alt={session?.user?.name}
            referrerPolicy="no-referrer"
          />
        </Link>
      ) : (
        <Link
          className="border flex gap-1 items-center font-semibold  bg-stone-200 text-stone-800 py-1 px-2 rounded-md"
          href="/login"
        >
          <LockClosedIcon className="size-4" />
          Login
        </Link>
      )}
    </div>
  );
};

export default HeaderNav;
