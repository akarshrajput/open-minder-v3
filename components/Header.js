import Logo from "./Logo";
import Search from "./Search";
import HeaderNav from "./HeaderNav";
const hostname = process.env.HOST_NAME;

const Header = () => {
  return (
    <div className="flex gap-6 items-center  px-4 py-2  rounded-sm">
      <Logo />
      <Search hostname={hostname} />
      <HeaderNav />
    </div>
  );
};

export default Header;
