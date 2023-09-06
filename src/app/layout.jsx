"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/extra/NavBar";
import "tailwindcss/tailwind.css";

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkModeFunc = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <body className="dark:bg-gray-900 bg-white">
        <NavBar dark={darkMode} />
        <main className={`container mx-auto px-5 mt-4`}>
          <button
            onClick={toggleDarkModeFunc}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "dark:bg-gray-700 dark:text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Alternar modo oscuro
          </button>

          {children}
        </main>
      </body>
    </html>
  );
}
