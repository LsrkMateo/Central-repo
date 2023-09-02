import Link from "next/link";

function NavBar({ dark }) {
  // Clases de estilo base que son comunes a ambas versiones (claro y oscuro)
  const commonClasses = "block p-2 pl-3 pr-4 rounded md:p-0";

  // Clases de estilo específicas para el modo claro y oscuro
  const lightModeClasses =
    "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  const darkModeClasses =
    "text-gray-200 bg-gray-950  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <nav className={`${dark ? "bg-gray-950" : "bg-gray-200"}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"} className="flex items-center">
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Repositorio de proyectos
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
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
        <div
          className={`hidden w-full md:block md:w-auto ${
            dark ? "md:bg-gray-850" : "md:bg-gray-200"
          }`}
          id="navbar-default"
        >
          <ul
            className={`font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
              dark
                ? "md:bg-gray-950 md:border-gray-950"
                : "md:bg-gray-200 md:border-gray-200"
            }`}
          >
            <li>
              <Link
                href={"/documentacion"}
                className={`${commonClasses} ${
                  dark ? darkModeClasses : lightModeClasses
                }`}
              >
                Documentacion
              </Link>
            </li>
            <li>
              <Link
                href={"/videos"}
                className={`${commonClasses} ${
                  dark ? darkModeClasses : lightModeClasses
                }`}
              >
                Videos
              </Link>
            </li>
            <li>
              <Link
                href={"/blogs"}
                className={`${commonClasses} ${
                  dark ? darkModeClasses : lightModeClasses
                }`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={"/contacto"}
                className={`${commonClasses} ${
                  dark ? darkModeClasses : lightModeClasses
                }`}
              >
                Contacto
              </Link>
            </li>
            <li className="w-6 h-6">
              <Link href={"/juegos"} className={`${commonClasses}`}>
                <img
                  src={`${dark ? "./misterio-red.png" : "./misterio-black.png"}`}
                  alt="a"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
