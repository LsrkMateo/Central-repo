"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "./context";
import { format } from "date-fns";


function Page() {
  const { darkMode } = useDarkMode();
  const linkArray = [
    "https://api.github.com/repos/getcursor/cursor",
    "https://api.github.com/repos/LsrkMateo/next-js-mongodb",
    "https://api.github.com/repos/LsrkMateo/Hashnode-blogs",
    "https://api.github.com/repos/LsrkMateo/database-test",
    "https://api.github.com/repos/LsrkMateo/Nextjs-ga-test",
    "https://api.github.com/repos/LsrkMateo/Docker---apache",
  ];

  const [repoData, setRepoData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgColorClass, setBgColorClass] = useState("");
  const [textColorClass, setTextColorClass] = useState("");
  const [textMutedClass, setTextMutedClass] = useState("");

  const getRepo = async (url) => {
    try {
      const response = await axios.get(url);
      setRepoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (url) => {
    window.open(url);
  };

  const updateDarkModeClasses = () => {
    const storedDarkMode =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("darkMode"));
    setIsDarkMode(storedDarkMode);
    setBgColorClass(storedDarkMode ? "bg-gray-950" : "bg-gray-100");
    setTextColorClass(storedDarkMode ? "text-white" : "text-gray-900");
    setTextMutedClass(storedDarkMode ? "text-gray-400" : "text-gray-700");
  };

  useEffect(() => {
    linkArray.forEach(getRepo);

    // Update dark mode classes initially
    updateDarkModeClasses();

    // Listen for changes in localStorage
    window.addEventListener("storage", updateDarkModeClasses);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", updateDarkModeClasses);
    };
  }, []);

  return (
    <div className={`min-h-screen p-8 ${bgColorClass}`}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repoData.length > 0 ? (
          repoData.map((data, index) => (
            <div
              key={index}
              className={`p-4 rounded shadow-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              } transition-all hover:${
                isDarkMode ? "brightness-125" : "brightness-75"
              }`}
            >
              <div className={`flex items-center ${textColorClass}`}>
                <div className="text-2xl font-bold mb-4">{data.name}</div>
                <div className="ml-7">
                  <img
                    src={data.owner.avatar_url}
                    alt="data.owner.avatar"
                    width={66}
                    height={66}
                  />
                </div>
              </div>

              <div className={`mb-2 ${textMutedClass}`}>
                Autor: {data.owner.login}
              </div>

              <div className={`mb-2 ${textMutedClass}`}>
                Descripcion: {!data.description ? "no tiene" : data.description}
              </div>
              <div className={`mb-2 ${textMutedClass}`}>
                Última actualización:
                {format(new Date(data.pushed_at), "dd/MM/yyyy HH:mm")}
              </div>

              <button
                className={`bg-blue-500 text-white p-2 rounded`}
                onClick={() => window.open(data.html_url)}
              >
                Ver en GitHub
              </button>
            </div>
          ))
        ) : (
          <div className={`text-center ${textMutedClass}`}>Cargando...</div>
        )}
      </div>
    </div>
  );
}

export default Page;
