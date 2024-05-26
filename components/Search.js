"use client";
import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Search = () => {
  const [showSearchContent, setShowSearchContent] = useState(false);
  const searchContentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      searchContentRef.current &&
      !searchContentRef.current.contains(event.target)
    ) {
      setShowSearchContent(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex font-medium flex-col relative max-w-sm">
      <div className="flex items-center gap-1 rounded-lg bg-slate-50 border w-96 pl-2">
        <MagnifyingGlassIcon className="size-6 text-slate-400" />
        <input
          className="py-2 px-2 w-11/12 bg-slate-50 outline-none"
          placeholder="Search blogs, news, articles and more..."
          onFocus={() => setShowSearchContent(true)}
        />
      </div>
      {showSearchContent && (
        <SearchContent
          ref={searchContentRef}
          setShowSearchContent={setShowSearchContent}
        />
      )}
    </div>
  );
};

Search.displayName = "Search";

const SearchContent = React.forwardRef((props, ref) => {
  const { setShowSearchContent } = props;

  const handleClick = () => {
    setShowSearchContent(false);
  };

  return (
    <div
      onClick={handleClick}
      ref={ref}
      className="absolute font-medium top-full left-0 w-96 bg-white p-1 mt-1 border border-gray-300 rounded-md shadow-md"
    >
      <ul className="flex flex-col gap-1">
        <Link
          className="flex gap-1 items-center bg-indigo-200 py-1 px-2 rounded-md text-indigo-800"
          href="/subscription"
        >
          <li>Openminder plus</li>
          <SparklesIcon className="size-4" />
          <li>AI and more...</li>
        </Link>
      </ul>
    </div>
  );
});

SearchContent.displayName = "SearchContent";

export default Search;
