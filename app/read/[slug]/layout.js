import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <main className="flex flex-col gap-2 w-[80rem] p-4">{children}</main>
        <footer className="w-full bg-gray-800 p-4 text-white text-center">
          <p>&copy; 2024 Open Minder</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
