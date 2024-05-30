import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <div>
        {/* <p>Open Minder</p> */}
        <Link href="/">
          <Image src="/open-minder-9.png" width={140} height={10} alt="Logo" />
          {/* <div className="flex items-center">
            <p className="font-medium text-2xl text-stone-800 leading-none rounded-l-md p-1">
              OPEN
            </p>
            <p className="font-bold text-2xl text-red-600 leading-none rounded-r-md p-1">
              MINDER
            </p>
          </div> */}
        </Link>
      </div>
    </div>
  );
};

export default Logo;
