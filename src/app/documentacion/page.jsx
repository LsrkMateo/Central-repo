"use client"
import { useDarkMode } from "../context";

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
      <div className={`text-3xl font-bold mb-4 mt-4 ${textColorClass}`}>
        Manejo del modo oscuro:
      </div>
      <div className={`mb-2 ${textMutedClass}`}>
        Se utiliza localStorage para acceder al valor booleano de `darkMode`.
        Dependiendo de este valor, se aplican los estilos utilizando el operador
        ternario para el modo oscuro o claro.
        <div className={`text-2xl font-bold mb-4 mt-4 ${textColorClass}`}>
          Solución al error ReferenceError: localStorage is not defined (proceso
          de corrección, aún no se ha arreglado el problema):
        </div>
        Origen del error: Esto se debe a que el entorno de ejecución de Next.js
        es en el lado del servidor, mientras que localStorage se encuentra en el
        lado del cliente, por lo que es imposible acceder a este objeto. Se crea
        una función que utiliza useEffect para acceder al localStorage del
        navegador. Esta función devuelve el valor de la clave 'darkMode', y
        luego se utiliza para aplicar los estilos a los elementos.
      </div>
      <div className={`text-2xl font-bold mt-4 mb-2 ${textColorClass}`}>
        Github Actions:
      </div>
      <div className={`mb-2 ${textMutedClass}`}>Construcción...</div>
      <div className={`text-2xl font-bold mt-4 mb-2 ${textColorClass}`}>
        Descubrimientos extra:
      </div>
      <div className={`mb-4 ${textMutedClass}`}>
        Aquí se colocan los descubrimientos que voy haciendo, como el enrutado
        utilizando page.jsx e importación de imágenes desde la ruta "public".
      </div>
      <div>
        consumir api de steam
      </div>
      <div>
        consumir api de github
      </div>
    </div>
  );
}

export default Documentacion;
