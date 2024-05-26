import { signOutAction } from "@lib/actions";
import { auth } from "@lib/auth";

const page = async ({ params }) => {
  const session = await auth();
  return (
    <div>
      <p>Welcome {session.user.name}</p>
      <form action={signOutAction}>
        <button className="flex gap-1 items-center font-medium  bg-emerald-600 text-stone-50 py-2 px-2 rounded-[4px]">
          Logout
        </button>
      </form>
    </div>
  );
};

export default page;
