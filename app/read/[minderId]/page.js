import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import hostname from "@lib/hostname";
import React from "react";

export const metadata = {
  title: `Read Minder`,
};

const page = async ({ params }) => {
  const res = await fetch(`${hostname}/api/v1/minders/${params.minderId}`);
  const minder = await res.json();
  // console.log(minder);
  const contentWithLineBreaks = minder?.data?.content.replace(/\n/g, "<br>");
  return (
    <div className="font-medium flex flex-col items-center">
      <div className="flex flex-col gap-2 w-[80rem]">
        {minder?.data?.genre ? (
          <p className="text-xl font-bold text-stone-600">
            Genre : {minder?.data?.genre}
          </p>
        ) : (
          ""
        )}
        <h1 className="text-[5rem] text-stone-600 font-bold border-l-4 border-l-black pl-4">
          {minder?.data?.heading}
        </h1>
        <div className="flex gap-2 items-center py-2">
          <img src={minder?.data?.author?.photo} className="w-6 rounded-full" />
          <p>{minder?.data?.author?.name}</p>
          <CheckBadgeIcon className="size-5 text-sky-500" />
          <p className="px-2 bg-stone-100 rounded-full w-fit border">
            {minder?.data?.minderType}
          </p>
        </div>

        <img src={minder?.data?.featuredImage} className="w-full rounded-md" />
        <div>
          <p className="text-xl border-l-2 border-l-black pl-4 p-2 my-2">
            {minder?.data?.description}
          </p>
          <div>
            <p
              className="text-lg px-4 p-2 my-2"
              dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
            >
              {/* Render content with line breaks */}
            </p>
          </div>
        </div>
        {minder?.data?.summary ? (
          <div className="px-4 text-lg  mt-6 mb-20 border-l-2 border-l-black">
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
