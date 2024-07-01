import Logo from "./Logo";
import Search from "./Search";
import HeaderNav from "./HeaderNav";
import MinderScore from "./userComponents/MinderScore";
import dynamic from "next/dynamic";
const hostname = process.env.HOST_NAME;

const Header = () => {
  return (
    <div className="flex gap-6 items-center dark:bg-stone-950 bg-white px-4 py-2  rounded-sm">
      <Logo />
      <Search hostname={hostname} />
      <MinderScore />
      <HeaderNav />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
