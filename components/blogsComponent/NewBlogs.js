"use client";
import Loader from "@components/Loader";
import { CheckBadgeIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import hostname from "@lib/hostname";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNewBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${hostname}/api/v1/minders?minderType=blog&limit=4&sort=-createdAt`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        const fetchedBlogs = data?.data?.minders;
        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error("Error fetching Blogs", err);
        setError("Error fetching Blogs");
      } finally {
        setLoading(false);
      }
    };

    getNewBlogs();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-1 rounded-sm">
      <div className="flex gap-1 items-center">
        <NewspaperIcon className="size-4" />
        <p>New Blogs</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        blogs.map((blog) => <Blog blog={blog} key={blog._id} />)
      )}
    </div>
  );
};

const Blog = ({ blog }) => {
  return (
    <div>
      <Link href={`/read/${blog._id}`}>
        <div className="border bg-stone-100 p-1 rounded-md cursor-pointer flex flex-col gap-1">
          <div className="flex text-sm font-bold items-center gap-1">
            <img src={blog?.author?.photo} className="w-5 rounded-full" />
            <p>{blog?.author?.name}</p>
            {blog?.author?.verified ? (
              <CheckBadgeIcon className="size-4 text-cyan-600" />
            ) : (
              ""
            )}
            <p className="font-medium bg-gray-200 px-2 rounded-lg">
              {blog?.minderType}
            </p>
          </div>
          <p className="font-semibold text-sm"> {blog?.heading}</p>
          <p className="text-sm">{blog?.description}</p>
          {/* <div className="flex flex-wrap gap-x-1">
            {blog?.tags.map((tag) => (
              <p className="text-[10px]">#{tag}</p>
            ))}
          </div> */}
        </div>
      </Link>
    </div>
  );
};

export default NewBlogs;
