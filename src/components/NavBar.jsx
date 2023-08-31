import Link from "next/link";

function NavBar({ dark }) {
  return (
    <nav className={`py-5 mb-2 ${dark ? "bg-black" : "bg-gray-200"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1
            className={`text-2xl font-bold ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Repositorio de proyectos
          </h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/documentacion"
              className={`text-lg ${dark ? "text-white" : "text-gray-900"}`}
            >
              Documentación
            </Link>
          </li>
          <li>
            <Link
              href="/videos"
              className={`text-lg ${dark ? "text-white" : "text-gray-900"}`}
            >
              Videos
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className={`text-lg ${dark ? "text-white" : "text-gray-900"}`}
            >
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
