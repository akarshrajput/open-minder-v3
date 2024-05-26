import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <div>
        {/* <p>Open Minder</p> */}
        <Link href="/">
          <Image src="/open-minder-5.png" width={160} height={10} alt="Logo" />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
