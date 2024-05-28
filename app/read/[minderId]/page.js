import hostname from "@lib/hostname";
import React from "react";

export const metadata = {
  title: `Read Minder`,
};

const page = async ({ params }) => {
  const res = await fetch(`${hostname}/api/v1/minders/${params.minderId}`);
  const minder = await res.json();
  console.log(minder);
  return <div className="font-medium">{minder?.data?.heading}</div>;
};

export default page;
