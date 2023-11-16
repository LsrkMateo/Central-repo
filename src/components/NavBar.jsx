import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  BiExit,
  BiBookOpen,
  BiVideo,
  BiBox,
  BiBook,
  BiUser,
  BiSolidUserAccount,
  BiSolidContact,
  BiWrench,
} from "react-icons/bi";
import { useRouter } from "next/navigation";

function NavBar({ dark }) {
  const { data: session } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (url) => {
    router.push(url);
    setIsSidebarOpen(false);
  };

  return (
    <nav className="dark:bg-gray-950 bg-slate-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <button onClick={() => handleNavigation("/")}>
          <h1 className="dark:text-white self-center text-2xl font-semibold whitespace-nowrap">
            Repositorio de proyectos
          </h1>
        </button>
        {/* ... Resto del contenido de la barra de navegación */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-100 border-gray border-2 dark:bg-gray-900 text-black p-4 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="text-black dark:text-white text-2xl absolute top-2 right-4 cursor-pointer"
          >
            x
          </button>
          <ul className="space-y-4 mt-6 dark:text-white">
            <li className="flex items-center">
              <button
                onClick={() => handleNavigation("/documentacion")}
                className="flex items-center"
              >
                <span className="mr-2">
                  <BiBookOpen />
                </span>
                <h1>Documentación</h1>
              </button>
            </li>

            <li className="flex items-center">
              <button
                className="flex items-center"
                onClick={() => handleNavigation("/videos")}
              >
                <span className="mr-2">
                  <BiVideo />
                </span>
                <h1>Videos</h1>
              </button>
            </li>
            <li className="flex items-center">
              <button
                className="flex items-center"
                onClick={() => handleNavigation("/blogs")}
              >
                <span className="mr-2">
                  <BiBook />
                </span>
                <h1>Blogs</h1>
              </button>
            </li>
            <li className="flex items-center">
              <button
                className="flex items-center"
                onClick={() => handleNavigation("/contacto")}
              >
                <span className="mr-2">
                  <BiSolidContact />
                </span>
                <h1>Contacto</h1>
              </button>
            </li>

            {session ? (
              <div>
                <hr />
                <li className="flex items-center mt-3">
                  <button
                    className="flex items-center"
                    onClick={() => handleNavigation("/proyectos")}
                  >
                    <span className="mr-2">
                      <BiBox />
                    </span>
                    <h1>Proyectos</h1>
                  </button>
                </li>
              </div>
            ) : null}
            <hr />
            <li className="flex items-center">
              {session?.user ? (
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="flex items-center "
                >
                  <span className="mr-2">
                    <BiSolidUserAccount />
                  </span>
                  <h1>Tu perfil</h1>
                </button>
              ) : (
                <button onClick={() => handleNavigation("/login")}>
                  Iniciar sesión
                </button>
              )}
            </li>
            <hr />
            <li className="flex items-center">
              <button
                onClick={() => handleNavigation("/config")}
                className="flex items-center"
              >
                <span className="mr-2">
                  <BiWrench />
                </span>
                <h1>Ajustes</h1>
              </button>
            </li>
          </ul>
        </div>

        {/* Botón de usuario o icono */}
        <div className="cursor-pointer" onClick={toggleSidebar}>
          {session?.user ? (
            <img
              src={
                session.user.image ||
                "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
              }
              className="w-10 h-10"
              alt="Avatar"
            />
          ) : (
            <BiUser className="dark:text-white w-10 h-10" />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
