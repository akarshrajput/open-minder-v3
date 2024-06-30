"use client";
import React, { useState } from "react";
import Link from "next/link";
import WriteBlog from "./write/WriteBlog";
import WriteArticle from "./write/WriteArticle";

const WriteMinder = async ({ supabaseURL, hostname, session }) => {
  const [currentState, setCurrentState] = useState("Blog");
  return (
    <div>
      {!session?.user ? (
        <div className="flex flex-col gap-2 font-medium">
          <Link
            href="/login"
            className="bg-red-600 text-stone-100 p-2 rounded-lg w-fit"
          >
            Login to write Blog
          </Link>
          <p className="text-sm text-red-600 border-l-2 border-l-red-600 pl-2">
            You cannot write until you are not Logged In
          </p>
        </div>
      ) : (
        <div>
          <div className="px-2">
            <select
              className="py-0.5 text-stone-800 mb-4 px-2 border rounded-md border-stone-300 outline-none  bg-stone-100"
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value)}
            >
              <option value="Blog">Blog</option>
              <option value="Article">Article</option>
            </select>
          </div>
          <div>
            {currentState === "Blog" ? (
              <WriteBlog
                supabaseURL={supabaseURL}
                hostname={hostname}
                session={session}
              />
            ) : (
              ""
            )}
            {currentState === "Article" ? (
              <WriteArticle
                supabaseURL={supabaseURL}
                hostname={hostname}
                session={session}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteMinder;
