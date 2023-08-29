"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const linkArray = [
    "https://api.github.com/repos/LsrkMateo/next-js-mongodb",
    "https://api.github.com/repos/LsrkMateo/Hashnode-blogs"
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

  useEffect(() => {
    linkArray.forEach((link) => getRepo(link));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-2 gap-4">
        {repoData.length > 0 ? (
          repoData.map((data, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-lg">
              <div className="text-2xl font-bold mb-4">Nombre: {data.name}</div>
              <div className="text-gray-700 mb-2">
                Autor: {data.owner.login}
              </div>
              {/* Resto de los detalles del repositorio */}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700">Cargando...</div>
        )}
      </div>
    </div>
  );
}

export default Page;
