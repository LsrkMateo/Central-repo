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
          <main className={`container mx-auto `}>
            {/* <button
              onClick={toggleDarkModeFunc}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? "dark:bg-gray-700 dark:text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Alternar modo oscuro
            </button> */}

            {children}
            <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
              <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <a
                    href="https://flowbite.com/"
                    className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                  >
                    <img
                      src="https://flowbite.com/docs/images/logo.svg"
                      className="h-8"
                      alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                      ProyectSharing
                    </span>
                  </a>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                      <a href="#" className="hover:underline me-4 md:me-6">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline me-4 md:me-6">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline me-4 md:me-6">
                        Licensing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  © 2023{" "}
                  <a href="https://flowbite.com/" className="hover:underline">
                    ProyectSharing™
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
