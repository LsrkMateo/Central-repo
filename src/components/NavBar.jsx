import Link from "next/link";

function NavBar({ dark }) {
  return (
    <nav className={`py-5 mb-2 ${dark ? "bg-black" : "bg-gray-200"}`}>
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/">
          <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            Repositorio de proyectos
          </h1>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
