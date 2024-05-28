import WriteBlog from "@components/write/WriteBlog";
import { auth } from "@lib/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();

  return (
    <div>
      {!session?.user ? (
        <div className="flex flex-col gap-2 font-medium">
          <Link
            href="/login"
            className="bg-red-600 text-stone-100 p-2 rounded-lg w-fit"
          >
            Login to write Blog
          </Link>
          <p className="text-sm text-red-600 border-l-2 border-l-red-600 pl-2">
            You cannot write until you are not Logged In
          </p>
        </div>
      ) : (
        <WriteBlog session={session} />
      )}
    </div>
  );
};

export default page;
