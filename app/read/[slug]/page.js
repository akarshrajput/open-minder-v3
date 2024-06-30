import { CheckBadgeIcon } from "@heroicons/react/24/solid";
const hostname = process.env.HOST_NAME;
import React from "react";

const page = async ({ params }) => {
  const res = await fetch(`${hostname}/api/v1/minders/slug/${params.slug}`);

  const minder = await res.json();
  const contentWithLineBreaks = minder?.data?.content.replace(/\n/g, "<br>");
  const metadata = {
    title: minder?.data?.heading,
  };
  return (
    <div className="font-medium flex flex-col items-center">
      <div className="flex flex-col gap-2 w-[80rem]">
        {minder?.data?.genre ? (
          <p className="text-xl font-bold dark:text-stone-300 text-stone-600">
            Genre : {minder?.data?.genre}
          </p>
        ) : (
          ""
        )}
        <h1 className="text-[5rem] dark:text-stone-300 text-stone-600 font-bold border-l-4 border-l-black dark:border-stone-200 pl-4">
          {minder?.data?.heading}
        </h1>
        <div className="flex gap-2 items-center py-2">
          <img src={minder?.data?.author?.photo} className="w-6 rounded-full" />
          <p>{minder?.data?.author?.name}</p>
          <CheckBadgeIcon className="size-5 text-sky-500" />
          <p className="px-2 dark:bg-stone-700 bg-stone-100 rounded-full w-fit border">
            {minder?.data?.minderType}
          </p>
        </div>

        <img src={minder?.data?.featuredImage} className="w-full rounded-md" />
        <div>
          {minder?.data?.source ? (
            <div className="flex font-semibold w-fit text-sm text-stone-600 items-center gap-1">
              <p>Sources</p>
              <p className="">{minder?.data?.source}</p>
            </div>
          ) : (
            ""
          )}
          <p className="text-xl border-l-2 border-l-black dark:border-stone-200 pl-4 p-2 my-2">
            {minder?.data?.description}
          </p>

          {minder?.data?.journal ? (
            <div className="text-xl my-10 italic font-serif rounded-sm border-2 border-black dark:border-stone-200 pl-4 p-2">
              <p className="mb-2">Short Journal :</p>
              <p>{minder?.data?.journal}</p>
            </div>
          ) : (
            ""
          )}
          {minder?.data?.abstract ? (
            <div className="px-4 py-2 text-lg rounded-sm dark:text-red-500 text-red-800  mt-6 mb-20 border-l-2 dark:border-stone-200 border-l-black">
              {/* <p className="font-semibold text-xl mb-1">Abstract :</p> */}
              <p>{minder?.data?.abstract}</p>
            </div>
          ) : (
            ""
          )}
          <div>
            <div
              className="text-lg px-4 p-2 my-2"
              dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
            ></div>
          </div>
        </div>
        {minder?.data?.summary ? (
          <div className="px-4 text-lg  mt-6 mb-10 border-l-2 border-l-black dark:border-stone-200">
            <p className="font-semibold text-xl mb-1">Short summary :</p>
            <p>{minder?.data?.summary}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default page;
