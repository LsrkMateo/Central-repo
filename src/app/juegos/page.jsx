"use client";
import { useDarkMode } from "../context";

function Juegos() {
  const { darkMode } = useDarkMode();
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const bgColorClass = isDarkMode ? "bg-gray-950" : "bg-gray-100";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const textMutedClass = isDarkMode ? "text-gray-400" : "text-gray-700";
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
