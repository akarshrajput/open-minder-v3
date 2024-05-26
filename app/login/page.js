import { signInAction } from "@lib/actions";

const page = () => {
  return (
    <div>
      <form action={signInAction}>
        <p>Sign In</p>
        <button className="flex gap-1 items-center font-medium  bg-emerald-600 text-stone-50 py-2 px-2 rounded-[4px]">
          Continue with Google
        </button>
      </form>
    </div>
  );
};
export default page;
