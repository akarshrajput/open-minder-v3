import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const HeaderNav = async () => {
  return (
    <div className="ml-auto flex items-center gap-4">
      <div className="dropdown dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="border border-green-500 flex gap-1 items-center font-medium  bg-green-400 text-stone-800 py-1.5 px-2 rounded-md"
        >
          Services
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-2 font-medium"
        >
          <li>
            <a className="flex gap-1 items-center bg-indigo-200 py-1 px-2 rounded-md text-indigo-800">
              Earn
            </a>
          </li>
          <li>
            <a className="flex gap-1 items-center bg-indigo-200 py-1 px-2 rounded-md text-indigo-800">
              Item 2
            </a>
          </li>
        </ul>
      </div>
      <Link
        className="border border-purple-500 flex gap-1  items-center font-medium  bg-gradient-to-r from-purple-400 to-pink-400 text-stone-900 py-1.5 px-2 rounded-md"
        href="/subscription"
      >
        <p>Minder AI</p>
        <SparklesIcon className="size-4" />
      </Link>

      <Link
        className="border border-green-500 flex gap-1 items-center font-medium  bg-green-400 text-stone-800 py-1.5 px-2 rounded-md"
        href="/login"
      >
        Login
      </Link>
    </div>
  );
};

export default HeaderNav;
