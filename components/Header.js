import Logo from "./Logo";
import Search from "./Search";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <div className="flex gap-6 items-center px-4 py-2  rounded-sm">
      <Logo />
      <Search />
      <HeaderNav />
    </div>
  );
};

export default Header;
