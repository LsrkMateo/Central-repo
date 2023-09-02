"use client";

import { useDarkMode } from "../context";
import Link from "next/link";
function Documentacion() {
  const { darkMode } = useDarkMode();
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const bgColorClass = isDarkMode ? "bg-gray-950" : "bg-gray-100";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-700";

  return (
    <div className={`min-h-screen p-8 ${bgColorClass}`}>
      <div className={`text-4xl font-bold mb-4 ${textColorClass}`}>
        Documentación:
      </div>
      <div className={`mb-4 ${textMutedClass}`}>
        El objetivo de este proyecto es centralizar los proyectos que yo, como
        desarrollador principiante, voy creando. Se hace uso de Next.js con
        estilos Tailwind CSS para la construcción de la página. También se hace
        uso de la API de GitHub para la obtención de datos. En la sección
        "videos" se colocarán los videos en los que me baso para crear los
        proyectos. En la sección "blogs" se colocarán los blogs que voy
        escribiendo, que pueden ser documentación o simplemente un punto de
        vista ante cualquier noticia.
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href={"/documentacion/modo-oscuro"} className="boton-link">
          <div
            className={`p-4 rounded shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } transition-all hover:${
              isDarkMode ? "brightness-125" : "brightness-75"
            }`}
          >
            Manejo del modo oscuro
          </div>
        </Link>

        <Link href={"/documentacion/github-actions"} className="boton-link">
          <div
            className={`p-4 rounded shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } transition-all hover:${
              isDarkMode ? "brightness-125" : "brightness-75"
            }`}
          >
            Github actions
          </div>
        </Link>

        <Link
          href={"/documentacion/descubrimientos-extra"}
          className="boton-link"
        >
          <div
            className={`p-4 rounded shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } transition-all hover:${
              isDarkMode ? "brightness-125" : "brightness-75"
            }`}
          >
            Descubrimientos extra
          </div>
        </Link>

        <Link href={"/documentacion/apis"} className="boton-link">
          <div
            className={`p-4 rounded shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            } transition-all hover:${
              isDarkMode ? "brightness-125" : "brightness-75"
            }`}
          >
            consumo de apis
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Documentacion;
