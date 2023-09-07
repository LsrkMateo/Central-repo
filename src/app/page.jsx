"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

function Page() {
  const router = useRouter();
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
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repoData.length > 0 ? (
          repoData.map((data, index) => (
            <Card key={index} data={data} handleCardClick={handleCardClick} />
          ))
        ) : (
          <div className={`text-center dark:text-white text-black`}>
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
