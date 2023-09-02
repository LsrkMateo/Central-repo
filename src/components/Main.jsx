import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "@/app/context";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

function Main({ dark }) {
  console.log(dark);
  const router = useRouter();
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

  const getRepo = async (url) => {
    try {
      const response = await axios.get(url);
      setRepoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (url) => {
    router.push(`${url}`);
    console.log(url);
  };

  useEffect(() => {
    linkArray.forEach(getRepo);
  }, []);
  
  return (
    <div
      className={`min-h-screen p-8 ${
        dark ? "bg-black text-white" : "bg-gray-300 text-black"
      }`}
    >
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repoData.length > 0 ? (
          repoData.map((data, index) => (
            <div
              onClick={() => handleCardClick(data.id)}
              key={index}
              className={`p-4 rounded shadow-lg ${
                dark ? "bg-gray-800" : "bg-gray-100"
              } transition-all`}
            >
              <div className={`flex items-center`}>
                <div
                  className={`text-2xl font-bold mb-4 ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  {data.name}
                </div>
                <div className="ml-7">
                  <img
                    src={data.owner.avatar_url}
                    alt="data.owner.avatar"
                    width={66}
                    height={66}
                  />
                </div>
              </div>

              <div
                className={`mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                Autor: {data.owner.login}
              </div>

              <div
                className={`mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                Descripcion: {!data.description ? "no tiene" : data.description}
              </div>
              <div
                className={`mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
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
          <div className={`text-center ${dark ? "text-white" : "text-black"}`}>
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
