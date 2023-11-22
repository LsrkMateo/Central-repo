"use client";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      <h1 className="text-3xl font-bold m-6 mb-0 dark:text-white right-0">
        Configuración:
      </h1>
      <div className="flex-row flex mt-10 flex-wrap mx-auto gap-5">
        <div className="p-4 mt-0 border-white border w-fit h-fit rounded-lg">
          <div className="flex flex-row right-0 dark:text-white align-middle">
            <img
              width={120}
              height={120}
              className="rounded-full right-0 "
              src={`https://robohash.org/${
                session && session.user && session.user.name
              }.png`}
              alt="user photo"
            />
            <div className="gap-2">
              <h2 className="text-2xl font-bold">
                {session && session.user && session.user.name}
              </h2>
              <h3 className="text-lg">
                {session && session.user && session.user.email}
              </h3>

              <button className=" m-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Editar perfil
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border-white border w-fit h-fit rounded-lg">
          <h2 className="text-xl font-semibold dark:text-white">
            Apariencia:
          </h2>
          <label className="relative inline-flex items-center mb-5 cursor-pointer m-10">
            <input type="checkbox" defaultValue="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Modo oscuro
            </span>
          </label>
        </div>
      </div>

      <br />
    </div>
  );
}

export default Page;
