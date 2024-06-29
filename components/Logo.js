"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
          />
        ) : (
          <Image
            src="/open-minder-logo-light.png"
            width={140}
            height={10}
            alt="Logo"
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
