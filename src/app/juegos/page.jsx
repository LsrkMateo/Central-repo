"use client";

import { useEffect } from "react";
import { useDarkMode } from "../context";

function Juegos() {
  const { darkMode } = useDarkMode();
  let isDarkMode = darkMode;

  if (typeof window !== "undefined") {
    const localStorageDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (localStorageDarkMode !== undefined && localStorageDarkMode !== null) {
      isDarkMode = localStorageDarkMode;
    }
  }

  const bgColorClass = isDarkMode ? "bg-gray-950" : "bg-gray-100";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-700";

  useEffect(() => {
    // Escuchar cambios en localStorage y actualizar el estado si cambia
    const handleStorageChange = (e) => {
      if (e.key === "darkMode") {
        const newValue = JSON.parse(e.newValue);
        isDarkMode !== newValue && window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={`min-h-screen p-8 ${bgColorClass}`}>
      <div className={`text-4xl font-bold mb-4 ${textColorClass}`}>
        Juegos??
      </div>
      <div className={`mb-4 ${textMutedClass}`}>
        asi es, aqui colocare los juegos que me parecen en extremo divertidos,
        la otra finalidad de esto es tener un control de los juegos que voy
        jugando, dar mi opinion, ademas intentare consumir quizas (si hay) la
        api de steam o gamejolt
      </div>
    </div>
  );
}

export default Juegos;
