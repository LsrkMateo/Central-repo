"use client";
import { useEffect, useState } from "react";
function page() {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    try {
      const res = await fetch("api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const users = await res.json();
        await setUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      <div className="dark:text-white">
        {users && users.users
          ? users.users.map((user) => user.name)
          : "Cargando usuarios"}
      </div>
    </div>
  );
}

export default page;
