"use client";
import React from "react";
import NavBar from "../components/NavBar";
import { DarkModeProvider, useDarkMode } from "./context";
import 'tailwindcss/tailwind.css';

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <DarkModeLayout>{children}</DarkModeLayout>
    </DarkModeProvider>
  );
}

function DarkModeLayout({ children }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <html lang="en">
      <body className={`${darkMode ? "bg-gray-900" : "bg-white"} bg-black`}>
        <NavBar dark={darkMode} />
        <main className={`container mx-auto px-5 mt-4`}>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Toggle Dark Mode
          </button>
          {children}
        </main>
      </body>
    </html>
  );
}
