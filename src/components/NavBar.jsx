import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Repositorio de proyectos</h1>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;