import Avatar from "boring-avatars";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  BiExit,
  BiGame,
  BiSolidContact,
  BiBookOpen,
  BiVideo,
  BiBook,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
function NavBar({ dark }) {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (url) => {
    window.location.href = url;
    setIsMenuOpen(false);
  };
  const router = useRouter();

  return (
    <nav className={`${dark ? "bg-gray-950" : "bg-gray-200"} `}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center"
        >
          <span
            className={` self-center text-2xl font-semibold whitespace-nowrap ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Repositorio de proyectos
          </span>
        </button>
        <div className="hidden md:flex flex-row space-x-4 dark:text-gray-200">
          <button
            className="flex flex-col gap-1 items-center"
            onClick={() => handleNavigation("/documentacion")}
          >
            Documentacion <BiBookOpen />
          </button>
          <button
            className="flex flex-col gap-1 items-center"
            onClick={() => handleNavigation("/videos")}
          >
            Videos <BiVideo />
          </button>
          <button
            className="flex flex-col gap-1 items-center"
            onClick={() => handleNavigation("/blogs")}
          >
            Blogs <BiBook />
          </button>
          <button
            className="flex flex-col gap-1 items-center"
            onClick={() => handleNavigation("/contacto")}
          >
            Contacto
            <BiSolidContact />
          </button>

          {session?.user ? (
            <div className="flex flex-row gap-3">
              <div className="flex column gap-5 items-center cursor-pointer">
                <img
                  onClick={() => {
                    router.push("/dashboard", { scroll: false });
                  }}
                  src={
                    session.user.image ||
                    "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
                  }
                  className="w-10 h-10"
                  alt=""
                />
              </div>
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={async () => {
                  signOut();
                }}
              >
                <BiExit />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  router.push("/register");
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Registarse
              </button>
              <button
                onClick={async () => {
                  router.push("/login");
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Iniciar sesion
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          className={`md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}
        >
          <span className="sr-only">Abrir menú principal</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="w-full flex justify-end">
          <div
            className={`md:hidden absolute h-max flex justify-center items-center ${
              dark ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <ul className="font-medium flex flex-col p-4 space-y-4 dark:text-gray-300">
              <li>
                <button onClick={() => handleNavigation("/documentacion")}>
                  Documentacion
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/videos")}>
                  Videos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/blogs")}>
                  Blogs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/contacto")}>
                  Contacto
                </button>
              </li>

              <li>
                {session?.user ? (
                  <div className="flex flex-row gap-3">
                    <div className="cursor-pointer">
                      <img
                        onClick={() => {
                          router.push("/dashboard", { scroll: false });
                        }}
                        src={
                          session.user.image ||
                          "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
                        }
                        className="w-10 h-10"
                        alt="Ir al perfil"
                      />
                    </div>
                    <button
                      className=" text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={async () => {
                        signOut;
                      }}
                    >
                      <BiExit />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        router.push("/register");
                      }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Registarse
                    </button>
                    <button
                      onClick={async () => {
                        router.push("/login");
                      }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Iniciar sesion
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
