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
import { ChalkboardSimple } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";

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
          <BaseButton href="/write">
            <PlusIcon className="size-4" />
            Write
          </BaseButton>
          <BaseButton href="/write/biography">
            <ArrowUpTrayIcon className="size-4" />
            Upload Videos
          </BaseButton>
          <BaseSpecialButton href="/share/work">
            <ChalkboardSimple weight="bold" className="size-4" />
            Share Work
          </BaseSpecialButton>
        </ul>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Hero), { ssr: false });
