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
import BaseSpecialButton from "./buttons/BaseSpecialButton";
import BaseButton from "./buttons/BaseButton";

const Hero = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-1  rounded-lg">
      <div className="flex flex-col gap-2">
        <ul className="flex gap-2">
          <Link href="/write/blog">
            <li className="flex gap-1 font-semibold items-center bg-red-600 text-stone-100 py-1 px-2 rounded-[4px]">
              <PlayIcon className="size-4 text-stone-100" />
              Minder Shorts
            </li>
          </Link>

          <BaseSpecialButton>
            <CubeIcon className="size-4" />
            Discover
          </BaseSpecialButton>
          <BaseButton href="/write/blog">
            <PlusIcon className="size-4" />
            Blog
          </BaseButton>
          <BaseButton href="/write/article">
            <PlusIcon className="size-4 " />
            Article
          </BaseButton>

          <BaseButton href="/write/news">
            <PlusIcon className="size-4 " />
            News
          </BaseButton>
          <BaseButton href="/write/research-paper">
            <PlusIcon className="size-4 " />
            Research Paper
          </BaseButton>
          <BaseButton href="/write/story">
            <PlusIcon className="size-4" />
            Story
          </BaseButton>
          <BaseButton href="/write/biography">
            <PlusIcon className="size-4 " />
            Biography
          </BaseButton>
          <BaseButton href="/write/biography">
            <ArrowUpTrayIcon className="size-4" />
            Upload Videos
          </BaseButton>
          <BaseSpecialButton href="/share/work">
            <ShareIcon className="size-4" />
            Share Work
          </BaseSpecialButton>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
