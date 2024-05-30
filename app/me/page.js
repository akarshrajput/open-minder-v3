import Account from "@components/Account";
import CurrentUserMinders from "@components/currentUserComponents/CurrentUserMinders";
import { signOutAction } from "@lib/actions";
import { auth } from "@lib/auth";

export const metadata = {
  title: `User Profile`,
};

const page = async () => {
  const session = await auth();
  return (
    <div className="font-medium flex flex-col gap-2">
      <Account session={session} />
      {session?.user ? (
        <form action={signOutAction}>
          <button
            className="border border-red-500 flex gap-1 items-center font-medium  bg-red-400 text-stone-800 py-1.5 px-2 rounded-md"
            href="/about"
          >
            Logout
          </button>
        </form>
      ) : (
        ""
      )}
      <div>
        <CurrentUserMinders />
      </div>
    </div>
  );
};

export default page;
