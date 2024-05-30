import {
  ArrowUpTrayIcon,
  CubeIcon,
  PlayIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { auth } from "@lib/auth";
import Link from "next/link";
import React from "react";

const Hero = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-1  rounded-lg">
      {/* <div className="flex gap-2 items-center">
        <p>Openminder - English Newsletter</p>
        <p className="text-sm w-fit bg-stone-100 border px-2 rounded-md">
          Version 3.0.1 : OpenMinder
        </p>
      </div> */}
      <div className="flex flex-col gap-2">
        {/* <h2 className="font-medium flex gap-1 items-center">
          <PencilSquareIcon className="size-4" />
          What you want to write?
          {session?.user ? (
            <p className="text-sm text-stone-600 bg-stone-100 px-2 rounded-lg border">
              {session?.user?.name}
            </p>
          ) : (
            <p className="text-sm text-red-600 bg-red-100 px-2 rounded-lg border">
              Login to write
            </p>
          )}
        </h2> */}

        <ul className="flex gap-2">
          <Link href="/write/blog">
            <li className="flex gap-1 font-semibold items-center bg-red-600 text-stone-100 py-1 px-2 rounded-[4px]">
              <PlayIcon className="size-4 text-stone-100" />
              Minder Shorts
            </li>
          </Link>
          <Link href="/write/blog">
            <li className="flex gap-1 font-semibold items-center bg-stone-800 text-stone-100 py-1 px-2 rounded-[4px]">
              <CubeIcon className="size-4 text-stone-100" />
              Discover
            </li>
          </Link>
          <Link href="/write/blog">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              Blog
            </li>
          </Link>
          <Link href="/write/article">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              Article
            </li>
          </Link>
          <Link href="/write/news">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              News
            </li>
          </Link>
          <Link href="/write/research-paper">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              Research Paper
            </li>
          </Link>
          <Link href="/write/story">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              Story
            </li>
          </Link>
          <Link href="/write/biography">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <PlusIcon className="size-4 text-stone-800" />
              Biography
            </li>
          </Link>

          <Link href="/write/biography">
            <li className="flex gap-1 font-semibold items-center bg-stone-200 text-stone-800 py-1 px-2 rounded-[4px]">
              <ArrowUpTrayIcon className="size-4" />
              Upload Videos
            </li>
          </Link>
          <Link href="/share/work">
            <li className="flex gap-1 font-semibold items-center bg-stone-800 text-stone-100 py-1 px-2 rounded-[4px]">
              <ShareIcon className="size-4" />
              Share Work
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
