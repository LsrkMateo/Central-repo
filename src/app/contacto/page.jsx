"use client";

import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

function Contacto() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/LsrkMateo"
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 dark:bg-gray-950 bg-gray-100">
      {userData ? (
        <div className={` p-4 rounded shadow-lg dark:bg-gray-900 bg-gray-200`}>
          <div
            className={`text-3xl font-semibold mb-4 dark:text-white text-gray-900`}
          >
            {userData.login}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Name: {userData.name}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Location: {userData.location}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Public Repos: {userData.public_repos}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Followers: {userData.followers}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Following: {userData.following}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Bio: {userData.bio}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Company: {userData.company}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Blog: {userData.blog}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Email: {userData.email}
          </div>
          <div className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Twitter: {userData.twitter_username}
          </div>
        </div>
      ) : (
        <div>cargando...</div>
      )}
    </div>
  );
}

export default Contacto;
