import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
function Users({ username, email, icon }) {
  const { data: session } = useSession();
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
    <div className="min-h-screen pt-8 bg-gray-100 dark:bg-gray-950">
      <div className="absolute inline-block w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <a href="#">
              <img
                className="w-10 h-10 rounded-full"
                src={icon}
                alt="imagen de usuario"
              />
            </a>
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Follow
              </button>
            </div>
          </div>
          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <a href="#">{username}</a>
          </p>
          <p className="mb-3 text-sm font-normal">
            <a href="#" className="hover:underline">
              {email}
            </a>
          </p>
          <p className="mb-4 text-sm">
            Open-source contributor. Building{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              flowbite.com
            </a>
            .
          </p>
          <ul className="flex text-sm">
            <li className="me-2">
              <a href="#" className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  799
                </span>
                <span>Following</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  3,758
                </span>
                <span>Followers</span>
              </a>
            </li>
          </ul>
        </div>
        <div data-popper-arrow="" />
      </div>
    </div>
  );
}

export default Users;
