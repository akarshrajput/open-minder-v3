"use client";
import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
// import hostname from "@lib/hostname";
import Loader from "./Loader";
import dynamic from "next/dynamic";

const Search = ({ hostname }) => {
  const [input, setInput] = useState("");
  const [showSearchContent, setShowSearchContent] = useState(false);
  const searchContentRef = useRef(null);
  const [minders, setMinders] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
          const res = await fetch(
            `${hostname}/api/v1/minders?heading=${input}`
          );
          const data = await res.json();
          setMinders(data?.data?.minders || []);
        } catch (error) {
          console.error("Error fetching minders:");
        } finally {
          setLoading(false);
        }
      } else {
        setMinders([]);
      }
    };
    getMindersData();
  }, [input]);

  return (
    <div className="flex font-medium flex-col relative max-w-sm">
      <div className="flex items-center gap-1 rounded-lg dark:bg-stone-800 px-1 dark:border-stone-600 bg-stone-50  border w-96 pl-2">
        <MagnifyingGlassIcon className="size-6 text-slate-400" />
        <input
          className="py-2 px-2 w-11/12 dark:bg-stone-800 bg-stone-50  outline-none"
          placeholder="Search blogs, news, articles and more..."
          onFocus={() => setShowSearchContent(true)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {showSearchContent && (
        <SearchContent
          loading={loading}
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
  ({ minders, loading, setShowSearchContent }, ref) => {
    const handleClick = () => {
      setShowSearchContent(false);
    };

    return (
      <div
        onClick={handleClick}
        ref={ref}
        className="absolute overflow-scroll max-h-80 font-medium top-full left-0 w-96 dark:bg-stone-800 bg-stone-50 p-1 mt-1 border dark:border-stone-600 border-gray-300 rounded-md shadow-md"
      >
        {loading ? (
          <Loader />
        ) : (
          <ul className="flex flex-col gap-1">
            {minders.length > 0 ? (
              <p className="flex gap-1 items-center bg-gray-0 py-1 px-2 rounded-md">
                Results {minders.length}
              </p>
            ) : (
              ""
            )}
            <Link
              className="flex gap-1 items-center bg-indigo-400 py-1 px-2 rounded-md text-white"
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
        )}
      </div>
    );
  }
);

const SearchItem = ({ minder }) => {
  return (
    <Link
      className="flex gap-1 items-center bg-gray-100 dark:bg-stone-700 dark:hover:bg-stone-600  hover:bg-gray-200 py-1 px-2 rounded-md"
      href={`/read/${minder.slug}`}
    >
      {minder?.heading}
    </Link>
  );
};

SearchContent.displayName = "SearchContent";

export default dynamic(() => Promise.resolve(Search), { ssr: false });
