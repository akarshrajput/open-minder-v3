"use client";
import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import hostname from "@lib/hostname";

const Search = () => {
  const [input, setInput] = useState("");
  const [showSearchContent, setShowSearchContent] = useState(false);
  const searchContentRef = useRef(null);
  const [minders, setMinders] = useState([]);

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

  useEffect(() => {
    const getMindersData = async () => {
      if (input.trim()) {
        const res = await fetch(`${hostname}/api/v1/minders?heading=${input}`);
        const data = await res.json();
        setMinders(data?.data?.minders || []);
      } else {
        setMinders([]);
      }
    };
    getMindersData();
  }, [input]);

  return (
    <div className="flex font-medium flex-col relative max-w-sm">
      <div className="flex items-center gap-1 rounded-lg bg-slate-50 border w-96 pl-2">
        <MagnifyingGlassIcon className="size-6 text-slate-400" />
        <input
          className="py-2 px-2 w-11/12 bg-slate-50 outline-none"
          placeholder="Search blogs, news, articles and more..."
          onFocus={() => setShowSearchContent(true)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {showSearchContent && (
        <SearchContent
          minders={minders}
          ref={searchContentRef}
          setShowSearchContent={setShowSearchContent}
        />
      )}
    </div>
  );
};

Search.displayName = "Search";

const SearchContent = React.forwardRef(
  ({ minders, setShowSearchContent }, ref) => {
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
          {Array.isArray(minders) &&
            minders.map((minder) => (
              <SearchItem key={minder._id} minder={minder} />
            ))}
        </ul>
      </div>
    );
  }
);

const SearchItem = ({ minder }) => {
  return (
    <Link
      className="flex gap-1 items-center bg-green-200 py-1 px-2 rounded-md text-stone-800"
      href={`minder/${minder._id}`}
    >
      {minder?.heading}
    </Link>
  );
};

SearchContent.displayName = "SearchContent";

export default Search;
