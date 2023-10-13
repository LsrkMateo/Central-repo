import React, { useState } from "react";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa"; // Importa el icono de una estrella
import { useSession } from "next-auth/react";
import { id } from "date-fns/locale";
function Card({ data, handleCardClick }) {
  const { data: session } = useSession();
  const [starred, setStarred] = useState(false); // Estado para controlar el cambio de color de la estrella

  const handleStarClick = (e) => {
    e.stopPropagation(); // Evita que el click en la estrella se propague al botón
    setStarred(!starred); // Cambia el estado de la estrella al hacer clic
    if (session) {
      addStars(session.user.email);
    }
  };
  const addStars = async (email) => {
    try {
      const response = await fetch(`api/getUserInfo/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Si la solicitud se realiza con éxito (código 200), parsea la respuesta JSON
        const { user } = await response.json();

        // Aquí puedes utilizar la información del usuario, por ejemplo, para mostrarla en la página
        console.log("Información del usuario:", user);
        setuserInfor(user);
      } else {
        // Si la solicitud no se realiza con éxito, maneja el error de acuerdo a tus necesidades
        console.error("Error al obtener la información del usuario");
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error("Error durante la solicitud GET:", error);
    }
  };

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
        Lenguaje: {!data.language ? "no tiene" : data.language}
      </div>
      <div className={`mb-2 dark:text-gray-300 text-gray-600`}>
        Última actualización: {""}{" "}
        {format(new Date(data.pushed_at), "dd/MM/yyyy HH:mm")}
      </div>

      <button
        className={`bg-blue-500 text-white p-2 rounded`}
        onClick={() => window.open(data.html_url)}
      >
        Ver en GitHub
      </button>

      {/* Icono de estrella */}
      <span
        className={`text-yellow-500 cursor-pointer ml-2`}
        onClick={(e) => handleStarClick(e)}
      >
        <FaStar
          size={20}
          color={starred ? "yellow" : "gray"} // Cambia el color de la estrella
        />
      </span>
    </div>
  );
}

export default Card;
