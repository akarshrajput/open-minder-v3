import { signInAction, signInGithub } from "@lib/actions";
import Image from "next/image";

const page = () => {
  return (
    <div className="font-medium flex flex-col items-center">
      <h2 className="font-bold text-4xl mb-4">Login</h2>
      <div className="flex flex-col gap-2">
        <form action={signInAction}>
          <button className="bg-stone-100 border w-fit p-4 px-6 rounded-md text-stone-800 flex items-center gap-2">
            <Image src="/google-icon.png" width={20} height={20} />
            <p>Login with Google</p>
          </button>
        </form>
        <form action={signInGithub}>
          <button className="bg-gray-200 border w-fit p-4 px-6 rounded-md text-stone-800 flex items-center gap-2">
            <Image src="/github-icon.png" width={20} height={20} />
            <p>Login with Github</p>
          </button>
        </form>
      </div>
    </div>
  );
};
export default page;
