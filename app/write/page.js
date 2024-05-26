import React from "react";
import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/24/solid";

const page = () => {
  return (
    <div>
      <h2 className="font-medium mb-4">What you want to write?</h2>
      <ul className="flex gap-2">
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/blog">Blog</Link>
        </li>
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/article">Article</Link>
        </li>
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/news">News</Link>
        </li>
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/story">Story</Link>
        </li>
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/biography">Biography</Link>
        </li>
        <li className="flex gap-1 items-center bg-emerald-600 text-stone-50 py-1 px-2 rounded-[4px]">
          <HashtagIcon className="size-4 text-slate-100" />
          <Link href="/write/research-paper">Research Paper</Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
