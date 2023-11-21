"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BiXCircle, BiSolidPen, BiSolidArrowToLeft } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [repoData, setRepoData] = useState(null);
  const handleEdit = () => {
    router.replace(`${params.proyect_id}/edit`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/repos/getRepo/${params.proyect_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          await setRepoData(data);
        } else {
          console.error(
            "Error al obtener los datos del repositorio:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener los datos del repositorio:", error);
      }
    };

    fetchData();
  }, [params.project_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      {repoData ? (
        <div className="bg-white dark:bg-gray-900 w-full h-screen m-5 rounded-lg p-8 shadow-lg">
          <div className="mb-4 flex justify-between">
            <h2 className="text-3xl font-semibold dark:text-white mb-4">
              {repoData.repo && repoData.repo.name
                ? repoData.repo.name
                : "Nombre no disponible"}
            </h2>

            <div className="flex gap-6">
              <button
                onClick={() => {
                  handleEdit();
                }}
                className="flex justify-between items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                <p className="text-left">Editar repositorio</p>
                <span className="flex items-center">
                  <BiSolidPen />
                </span>
              </button>
              <button
                onClick={() => {
                  router.push('/proyectos');
                }}
                className="flex justify-between items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
              >
                <p className="text-left">Volver</p>
                <span className="flex items-center">
                  <BiSolidArrowToLeft />
                </span>
              </button>
            </div>
          </div>
          <hr />
          <p className="mt-4 text-gray-600 dark:text-gray-400 mb-4">
            {repoData.repo && repoData.repo.description
              ? repoData.repo.description
              : "Descripción no disponible"}
          </p>
          <div className="flex justify-between">
            <p className="text-yellow-500 dark:text-yellow-400">
              {repoData.repo && repoData.repo.stars
                ? repoData.repo.stars
                : "No tiene estrellas"}
            </p>
            <button
              onClick={() => {
                toast(
                  "Estas seguro de que quieres eliminar este repositorio?",
                  {
                    action: {
                      label: "Aceptar",
                      onClick: async () => {
                        try {
                          const response = await fetch(
                            `../api/repos/getRepo/${params.proyect_id}`,
                            {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                user_name: session.user.name,
                              }),
                            }
                          );
                          if (response.ok) {
                            router.back();
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      },
                    },
                  }
                );
              }}
              className="flex justify-between items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            >
              <p className="text-left">Eliminar repositorio</p>
              <span className="flex items-center">
                <BiXCircle />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <p className="dark:text-white">Cargando...</p>
      )}
      <Toaster theme="system" richColors />
    </div>
  );
}

export default Page;
