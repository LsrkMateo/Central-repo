"use client";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const handleNavigation = (url) => {
    router.push(url);
  };
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold  dark:text-white">
          Tus repositorios
        </h2>
        <button
          onClick={() => handleNavigation("/proyectos/crearProyecto")}
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 mb-4"
        >
          Crear un nuevo proyecto
        </button>
      </div>
      <hr />
    </div>
  );
}

export default page;
