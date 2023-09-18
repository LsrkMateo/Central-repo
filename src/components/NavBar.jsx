import { useState } from "react";

function NavBar({ dark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (url) => {
    window.location.href = url;
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${dark ? "bg-gray-950" : "bg-gray-200"} `}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center"
        >
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Repositorio de proyectos
          </span>
        </button>
        <div className="hidden md:flex space-x-4 dark:text-gray-200">
          <button onClick={() => handleNavigation("/documentacion")}>
            Documentacion
          </button>
          <button onClick={() => handleNavigation("/videos")}>Videos</button>
          <button onClick={() => handleNavigation("/blogs")}>Blogs</button>
          <button onClick={() => handleNavigation("/contacto")}>
            Contacto
          </button>
          <button onClick={() => handleNavigation("/juegos")}>
            <img
              src={`${dark ? "./misterio-red.png" : "./misterio-black.png"}`}
              alt="a"
              width={30}
              height={30}
            />
          </button>
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
                <button onClick={() => handleNavigation("/juegos")}>
                  <img
                    src={`${
                      dark ? "./misterio-red.png" : "./misterio-black.png"
                    }`}
                    alt="Juegos"
                    width={40}
                    height={60}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
