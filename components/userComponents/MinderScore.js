import { auth } from "@lib/auth";
import dynamic from "next/dynamic";
import React from "react";
const hostname = process.env.HOST_NAME;

const MinderScore = async () => {
  const res = await fetch(`${hostname}/api/v1/minders`);
  const minder = await res.json();
  //   console.log(minder.data);
  const session = auth();
  return (
    <div>
      {session ? (
        <p className="flex gap-1 font-semibold items-center dark:bg-stone-800 bg-stone-200 py-1 px-2 rounded-[4px]">
          Token : {minder?.data?.minders?.length}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MinderScore), { ssr: false });
