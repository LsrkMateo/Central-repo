"use client";
import { useDarkMode } from "../context";
function documentacion() {
  const { darkMode } = useDarkMode();

  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const bgColorClass = isDarkMode ? "bg-gray-950" : "bg-gray-100";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-700";

  return (
    <div className={`min-h-screen p-8 ${bgColorClass}`}>
      <div className={`text-4xl font-bold mb-4 ${textColorClass}`}>
        Documentacion:
      </div>
      <div className={`mb-4 ${textMutedClass}`}>
        El objetivo de este proyecto es centralizar los proyectos que yo como
        desarrollador principiante voy creando <br /> <br />
        Se hace uso de next js con estilos tailwind css para la construccion de
        la pagina, se hace uso de la api de github para la obtencion de datos,
        en la seccion `videos` se colocaran los videos en los que me baso para
        crear los proyectos. La seccion `blogs` se colocaran los blogs que voy
        escribiendo, pueden ser documentacion o simple punto de vista ante
        cualquier noticia. <br /> <br />
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </div>
      <div className={`text-3xl font-bold mb-4 mt-4 ${textColorClass}`}>
        Manejo del modo oscuro:
      </div>
      <div className={`mb-2 ${textMutedClass}`}>
        Se hace uso de localStorage para acceder al valor booleano de `darkMode`
        dependiendo de este se hace uso del operador ternario para aplicar
        estilos dependiendo si se quiere modo oscuro o claro.
        <div className={`text-2xl font-bold mb-4 mt-4 ${textColorClass}`}>
          Solucion error ReferenceError: localStorage is not defined (proceso de
          correccion, aun no se ha arreglado el problema)
        </div>
        origen del error: esto se debe a que el entorno de ejecuccion de Next JS
        es en el lado del servidor, localStorage se encuentra en el lado del
        cliente por lo que es imposible acceder a este objeto <br />
        Se crea una funcion que almacena un useEffect el cual si tiene acceso al
        localStorage del navegador, este devolvera el valor de la `key` :
        'darkMode' la funcion que engloba a este useEffect se llama para dar
        valor a la variable `storage` la cual es usada para dar los estilos a
        los elementos
      </div>
      <div className={`text-2xl font-bold mt-4 mb-2 ${textColorClass}`}>
        Github actions:
      </div>
      <div className={`mb-2 ${textMutedClass}`}>construccion...</div>
    </div>
  );
}

export default documentacion;
