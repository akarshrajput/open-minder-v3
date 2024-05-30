import { CheckBadgeIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const NewArticles = async () => {
  const hostname = process.env.HOST_NAME;
  const res = await fetch(
    `${hostname}/api/v1/minders?minderType=Article&limit=4&sort=-createdAt`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const fetchedBlogs = data?.data?.minders;

  return (
    <div className="flex flex-col gap-4 p-1 rounded-sm">
      <div className="flex gap-1 items-center">
        <NewspaperIcon className="size-4" />
        <p>New Articles</p>
      </div>
      {fetchedBlogs.map((blog) => (
        <Blog blog={blog} key={blog._id} />
      ))}
    </div>
  );
};

const Blog = ({ blog }) => {
  const newHeading = blog?.heading.substring(0, 50);
  const newDescription = blog?.description.substring(0, 80);
  return (
    <div>
      <Link href={`/read/${blog.slug}`}>
        <div className="px-1 cursor-pointer flex flex-col gap-1 border-l-2 pl-2 border-l-gray-400 ">
          <div className="flex text-sm font-medium items-center gap-1">
            <img src={blog?.author?.photo} className="w-5 rounded-full" />
            <p

            // href={`/user/${blog?.author?._id}`}
            >
              {blog?.author?.name}
            </p>
            {blog?.author?.verified ? (
              <CheckBadgeIcon className="size-4 text-cyan-600" />
            ) : (
              ""
            )}
            <p className="font-medium bg-gray-200 px-2 rounded-lg">
              {blog?.minderType}
            </p>
          </div>
          <p className="font-semibold"> {newHeading}</p>
          <p className="text-sm">{newDescription}</p>
          {/* <div className="flex flex-wrap gap-x-1">
            {blog?.tags.map((tag) => (
              <p className="text-[10px]">#{tag}</p>
            ))}
          </div> */}
          <div className="flex justify-center w-full overflow-hidden h-48">
            <img
              src={blog?.featuredImage}
              className="rounded-md w-full object-cover"
              alt="Featured Image"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewArticles;