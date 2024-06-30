import WriteMinder from "@components/WriteMinder";
import { auth } from "@lib/auth";
import Link from "next/link";
const hostname = process.env.HOST_NAME;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;

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
        <div>
          <WriteMinder
            supabaseURL={supabaseURL}
            hostname={hostname}
            session={session}
          />
        </div>
      )}
    </div>
  );
};

export default page;
