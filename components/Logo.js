"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeClass = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeClass);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const darkModeClass =
            document.documentElement.classList.contains("dark");
          setIsDarkMode(darkModeClass);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Link href="/">
        {isDarkMode ? (
          <Image
            src="/open-minder-logo-dark.png"
            width={140}
            height={10}
            alt="Logo"
            className="h-9 w-auto"
          />
        ) : (
          <Image
            src="/open-minder-logo-light.png"
            width={140}
            height={10}
            alt="Logo"
            priority={false}
            className="h-9 w-auto"
          />
        )}
      </Link>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Logo), { ssr: false });
