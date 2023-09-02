"use client"

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { DarkModeProvider, useDarkMode } from "./context";
import "tailwindcss/tailwind.css";

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <DarkModeLayout>{children}</DarkModeLayout>
    </DarkModeProvider>
  );
}

function DarkModeLayout({ children }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [localStorageDarkMode, setLocalStorageDarkMode] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = window.localStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        setLocalStorageDarkMode(storedDarkMode === "true");
      }
    } else {
      console.log("No se pudo acceder a local storage");
    }
  }, []);

  const toggleDarkModeFunc = () => {
    const newDarkMode = !darkMode;
    setLocalStorageDarkMode(newDarkMode);
    window.localStorage.setItem("darkMode", newDarkMode.toString());
    toggleDarkMode(newDarkMode);
  };

  return (
    <html lang="en">
      <body
        className={`${
          localStorageDarkMode !== null && localStorageDarkMode
            ? "bg-gray-900"
            : "bg-white"
        }`}
      >
        <NavBar dark={localStorageDarkMode !== null && localStorageDarkMode} />
        <main className={`container mx-auto px-5 mt-4`}>
          <button
            onClick={toggleDarkModeFunc}
            className={`px-4 py-2 rounded ${
              localStorageDarkMode !== null && localStorageDarkMode
                ? "bg-gray-700 text-white"
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
