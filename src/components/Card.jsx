import React from "react";
import { format } from "date-fns";

function Card({ data, handleCardClick }) {
  return (
    <div
      onClick={() => handleCardClick(data.id)}
      className={`p-4 rounded shadow-lg dark:bg-gray-800 bg-gray-200 transition-all`}
    >
      <div className={`flex items-center`}>
        <div className={`text-2xl font-bold mb-4 dark:text-white text-black`}>
          {data.name}
        </div>
        <div className="ml-7">
          <img
            src={data.owner.avatar_url}
            alt="data.owner.avatar"
            width={66}
            height={66}
          />
        </div>
      </div>

      <div className={`mb-2 dark:text-gray-300 text-gray-600`}>
        Autor: {data.owner.login}
      </div>

      <div className={`mb-2 dark:text-gray-300 text-gray-600`}>
        Descripcion: {!data.description ? "no tiene" : data.description}
      </div>
      <div className={`mb-2 dark:text-gray-300 text-gray-600`}>
        Última actualización: 
        {''} {format(new Date(data.pushed_at), "dd/MM/yyyy HH:mm")}
      </div>

      <button
        className={`bg-blue-500 text-white p-2 rounded`}
        onClick={() => window.open(data.html_url)}
      >
        Ver en GitHub
      </button>
    </div>
  );
}

export default Card;