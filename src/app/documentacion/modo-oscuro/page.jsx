"use client";

import React from "react";
import { useDarkMode } from "../../context";
function ModoOscuro() {
  const { darkMode } = useDarkMode();
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const bgColorClass = isDarkMode ? "bg-gray-950" : "bg-gray-100";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-700";
  return (
    <div className={`min-h-screen p-8 ${bgColorClass}`}>
      <div className={`text-3xl font-bold mb-4 mt-4 ${textColorClass}`}>
        Manejo del modo oscuro:
      </div>
      <div className={`mb-2 ${textMutedClass}`}>
        Se utiliza localStorage para acceder al valor booleano de `darkMode`.
        Dependiendo de este valor, se aplican los estilos utilizando el operador
        ternario para el modo oscuro o claro.
      </div>
      <div className={`text-2xl font-bold mb-4 mt-4 ${textColorClass}`}>
        Solución al error ReferenceError: localStorage is not defined (proceso
        de corrección, aún no se ha arreglado el problema):
      </div>
      <div className={`mb-2 ${textMutedClass}`}>
        Origen del error: Esto se debe a que el entorno de ejecución de Next.js
        es en el lado del servidor, mientras que localStorage se encuentra en el
        lado del cliente, por lo que es imposible acceder a este objeto. Se crea
        una función que utiliza useEffect para acceder al localStorage del
        navegador. Esta función devuelve el valor de la clave 'darkMode', y
        luego se utiliza para aplicar los estilos a los elementos.
      </div>
    </div>
  );
}

export default ModoOscuro;
