"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserInfo } from "../../../utils/userCrud";
function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userInfo, setuserInfor] = useState();
  const handleCardClick = (id) => {
    router.push(`proyectos/${id}`);
  };
  useEffect(() => {
    if (session) {
      getUserInfo(session.user.email)
        .then((user) => {
          setuserInfor(user);
          console.log("Datos del usuario:", user);
        })
        .catch((error) => {
          // Maneja el error
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [session]);

  // Función para realizar la solicitud GET

  const handleNavigation = (url) => {
    router.push(url);
  };

  userInfo ? console.log("info", userInfo) : console.log("error");

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold dark:text-white">Tus repositorios</h2>
        <button
          onClick={() => handleNavigation("/proyectos/crearProyecto")}
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 mb-4"
        >
          Crear un nuevo proyecto
        </button>
      </div>
      <hr />

      <div>
        {userInfo && userInfo.proyects ? (
          <div>
            {userInfo.proyects.map((proyect, index) => (
              <button
                className="dark:bg-gray-800 rounded-lg p-4 mt-4 w-full flex"
                key={index}
                onClick={() => {
                  handleCardClick(proyect._id);
                }}
              >
                <div className="border w-full text-left border-gray-300 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold dark:text-white mb-2">
                    {proyect ? proyect.name : "Nombre no disponible"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Descripcion:{" "}
                    {proyect
                      ? proyect.description
                      : "Descripción no disponible"}
                  </p>
                  <p className="text-yellow-500 dark:text-yellow-400">
                    Estrellas: {proyect ?  proyect.repoStars : "Sin estrellas"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="dark:text-white">Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default Page;
