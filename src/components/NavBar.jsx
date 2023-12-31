import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getRandomAvatar from "../../utils/getRandomAvatar";
import { useRouter } from "next/navigation";
import Avatar from "boring-avatars";
import { BiUser } from "react-icons/bi";
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { getUserInfo } from "../../utils/userCrud";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Toaster, toast } from "sonner";

function NavBar({ dark }) {
  const { userInfo, updateUser } = useContext(UserContext);
  const { data: session } = useSession();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Llama a la función getUserInfo cuando el componente se monte
    if (session) {
      getUserInfo(session.user.email)
        .then((user) => {
          // Actualiza el contexto con la información del usuario
          updateUser(user);
        })
        .catch((error) => {
          console.error("Error al obtener la información del usuario", error);
        });
    }
  }, [session]); // Dependencia de useEffect: se ejecutará cuando la sesión cambie

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between p-6">
        <a
          href={session ? "/main" : "/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ProyectSharing
          </span>
        </a>
        <div className="flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm relative bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleUserDropdown}
            id="user-menu-button"
            aria-expanded={isUserDropdownOpen}
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            {session ? (
              <img
                className="w-8 h-8 rounded-full"
                src={userInfo?.avatar_url}
                alt="user photo"
              />
            ) : (
              <BiUser className="text-white" style={{ fontSize: "3em" }} />
            )}
          </button>
          {/* Dropdown menu */}
          <div
            className={`${
              isUserDropdownOpen ? "absolute right-1" : "hidden"
            } z-50 my-4 mt-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            {session ? (
              <>
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userInfo?.name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {userInfo?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <div className="block md:hidden">
                    <li>
                      <a
                        href="/main"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Principal
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Proyectos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Blogs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Explorar creadores
                      </a>
                    </li>
                    <hr />
                  </div>
                  <li>
                    <a
                      href="/dashboard"
                      className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Panel de usuario
                    </a>
                  </li>
                  <li>
                    <a
                      href="/config"
                      className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Configuracion
                    </a>
                  </li>
                  <button
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                      toast("Estas seguro de que quieres cerrar sesion?", {
                        action: {
                          label: "confirmar",
                          onClick: () => {
                            signOut();
                          },
                        },
                      });
                    }}
                  >
                    cerrar sesion
                  </button>
                </ul>
              </>
            ) : (
              <>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Iniciar sesión
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Registrarte
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div
          className="mr-36 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/main"
                className={`${
                  pathname == "/main" ? "text-blue-700" : "text-white"
                } block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                aria-current="page"
              >
                Principal
              </a>
            </li>
            <li>
              <a
                href="/proyectos"
                className={`${
                  pathname == "/proyectos" ? "text-blue-700" : "text-white"
                } block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Proyectos
              </a>
            </li>
            <li>
            <a
                href="/blogs"
                className={`${
                  pathname == "/blogs" ? "text-blue-700" : "text-white"
                } block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Blogs
              </a>
            </li>
            <li>
            <a
                href="/creators"
                className={`${
                  pathname == "/creators" ? "text-blue-700" : "text-white"
                } block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Explorar creadores
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Toaster theme="system" richColors />
    </nav>
  );
}

export default NavBar;
