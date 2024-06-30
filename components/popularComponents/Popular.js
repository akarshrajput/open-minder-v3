import { ArrowTrendingUpIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Popular = async () => {
  let globalData = {};
  try {
    const hostname = process.env.HOST_NAME;

    const res = await fetch(
      `${hostname}/api/v1/minders/slug/the-rise-in-temperature-in-india-an-ala-6658a31504778ad751fa627a`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    const minder = data?.data;
    globalData = minder;
  } catch (err) {
    <p>Error!</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-1 rounded-sm">
      <div className="flex gap-2 items-center">
        <ArrowTrendingUpIcon className="size-5" />
        <p>Trending on Minder</p>
      </div>

      <Minder minder={globalData} key={globalData._id} />
    </div>
  );
};

const Minder = ({ minder }) => {
  const dateString = minder?.createdAt;
  const date = new Date(dateString);
  return (
    <div>
      <Link href={`/read/${minder.slug}`}>
        <div className="px-1 cursor-pointer flex flex-col gap-1 border-l-2 pl-2 border-l-gray-400">
          <div className="flex text-sm font-medium items-center gap-1">
            <img src={minder?.author?.photo} className="w-5 rounded-full" />
            <p>{minder?.author?.name}</p>
            {minder?.author?.verified && (
              <CheckBadgeIcon className="size-4 text-cyan-600" />
            )}
            <p className="font-medium dark:bg-stone-700 bg-gray-200 px-2 rounded-lg">
              {minder?.minderType}
            </p>
            <p className="font-medium dark:bg-stone-700 bg-stone-200 px-2 rounded-lg">
              {minder?.readTime} min read
            </p>
            <p className="font-medium dark:bg-stone-700 bg-stone-200 px-2 rounded-lg">
              {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
            </p>
          </div>
          <p className="font-semibold text-xl">{minder?.heading}</p>
          <div className="relative flex justify-center w-full overflow-hidden h-72">
            <img
              src={minder?.featuredImage}
              className="rounded-md w-full object-cover"
              alt="Featured Image"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
              <p>{minder?.summary}</p>
            </div>
          </div>
          <p className="text-sm">{minder?.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Popular;
