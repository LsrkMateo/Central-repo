"use client";
import { useEffect } from "react";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = window.localStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        toggleDarkMode(storedDarkMode === "true");
      }
    } else {
      console.log("no se pudo acceder a local storage");
    }
  }, [toggleDarkMode]);

  const toggleDarkModeFunc = () => {
    const newDarkMode = !darkMode;
    toggleDarkMode(newDarkMode);
    window.localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <html lang="en">
      <body
        className={`${
          JSON.parse(window.localStorage.getItem("darkMode"))
            ? "bg-gray-900"
            : "bg-white"
        }`}
      >
        <NavBar dark={JSON.parse(localStorage.getItem("darkMode"))} />
        <main className={`container mx-auto px-5 mt-4`}>
          <button
            onClick={toggleDarkModeFunc}
            className={`px-4 py-2 rounded ${
              JSON.parse(localStorage.getItem("darkMode"))
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
