"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "./context";
import { format } from "date-fns";

function Page() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const linkArray = [
    "https://api.github.com/repos/LsrkMateo/next-js-mongodb",
    "https://api.github.com/repos/LsrkMateo/Hashnode-blogs",
    "https://api.github.com/repos/LsrkMateo/database-test",
  ];

  const [repoData, setRepoData] = useState([]);

  const getRepo = async (url) => {
    try {
      const response = await axios.get(url);
      setRepoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (url) => {
    console.log("Clicked repository name:", url);
    window.open(url);
  };

  useEffect(() => {
    linkArray.forEach((link) => getRepo(link));
  }, []);

  return (
    <div
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-950" : "bg-gray-100"}`}
    >
      <div className="grid grid-cols-2 gap-4">
        {repoData.length > 0 ? (
          repoData.map((data, index) => (
            <div
              key={index}
              className={`p-4 rounded shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white"
              } ${
                darkMode ? "hover:brightness-125" : "hover:brightness-90"
              } transition-all`}
              onClick={() => handleCardClick(data.html_url)}
            >
              <div
                className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {data.name}
              </div>
              <div
                className={`mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Autor: {data.owner.login}
              </div>
              <div
                className={`mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Description: {!data.description ? "no tiene" : data.description}
              </div>
              <div
                className={`mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Última actualización:{" "}
                {format(new Date(data.pushed_at), "dd/MM/yyyy HH:mm")}
              </div>
            </div>
          ))
        ) : (
          <div
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
