"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserInfo } from "../../../utils/userCrud";
import ProyectCard from "../../components/proyectCard";
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
          <div className="grid grid-cols-3 gap-5">
            {userInfo.proyects.map((proyect, index) => (
              <ProyectCard
                proyectId={proyect._id}
                key={index}
                image={proyect.image_url}
                title={proyect ? proyect.name : "Nombre no disponible"}
                description={
                  proyect ? proyect.description : "Descripción no disponible"
                }
                tags={["prueba", "jaja ez"]}
                stars={proyect ? proyect.repoStars : "Sin estrellas"}
              />
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
