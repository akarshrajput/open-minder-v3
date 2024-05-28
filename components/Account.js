import React from "react";

const Account = ({ session }) => {
  return (
    <div>
      <p className="mb-4">{`Welcome ${session?.user?.name}`}</p>
      <form className="flex flex-col gap-2">
        <div className="flex gap-2 items-center bg-stone-100 w-fit p-2 rounded-md border">
          <label>Name</label>
          <input
            className="bg-inherit outline-none w-80 text-emerald-800"
            type="text"
            value={session?.user?.name}
          />
        </div>
        <div className="flex gap-2 items-center bg-stone-100 w-fit p-2 rounded-md border">
          <label>Email</label>
          <input
            className="bg-inherit outline-none w-80 text-emerald-800"
            type="text"
            value={session?.user?.email}
          />
        </div>
      </form>
    </div>
  );
};

export default Account;
