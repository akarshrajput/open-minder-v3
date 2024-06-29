"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStars, SunDim } from "@phosphor-icons/react/dist/ssr";

const DarkModeBtn = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center">
      {currentTheme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <SunDim
            className="size-8 bg-stone-800 p-1.5 rounded-md"
            weight="bold"
          />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <MoonStars
            className="size-8 bg-stone-200 p-1.5 rounded-md"
            weight="bold"
          />
        </button>
      )}
    </div>
  );
};

export default DarkModeBtn;
