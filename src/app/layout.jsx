"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "tailwindcss/tailwind.css";
import { Helmet } from "react-helmet";
import { Providers } from "./Providers";
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
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Helmet>
      <body className="dark:bg-gray-900 bg-white">
        <Providers>
          <NavBar dark={darkMode} />
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
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
        </Providers>
      </body>
    </html>
  );
}
