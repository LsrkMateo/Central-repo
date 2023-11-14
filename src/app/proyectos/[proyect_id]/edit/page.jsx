"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function page() {
  const { data: session } = useSession();
  const params = useParams();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState("");

  const proyect_id =
    typeof window !== "undefined"
      ? window.location.href.split("/")[
          window.location.href.split("/").indexOf("edit") - 1
        ]
      : undefined;

  const handleEdit = async () => {
    if (!name || !description) {
      setError("Todos los campos son nescesarios");
    } else {
      //actualiza desde repos

      await fetch(`../../api/repos/getRepo/${proyect_id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: repoData.repo._id,
          name,
          description,
        }),
      });
      setError("");
    }
    console.log(name, description);
  };
  const handleDelete = () => {
    toast("Estas seguro de que quieres eliminar este repositorio?", {
      action: {
        label: "Aceptar",
        onClick: async () => {
          try {
            const response = await fetch(
              `../../api/repos/getRepo/${params.proyect_id}`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            );
            if (response.ok) {
              toast("Repositorio eliminado de la base de datos");
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    });
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
          <h2 className="dark:text-white mb-3">Titulo:</h2>
          <div className="mb-4 flex justify-between">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="text-3xl w-full rounded font-semibold dark:text-white p-4  dark:bg-slate-800 mb-4"
              placeholder={
                repoData.repo && repoData.repo.name
                  ? repoData.repo.name
                  : "Nombre no disponible"
              }
            />
          </div>
          <hr />
          <h2 className="dark:text-white my-3">Descripcion:</h2>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="text-xl  w-full rounded font-semibold dark:text-white p-4  dark:bg-slate-800 mb-4"
            placeholder={
              repoData.repo && repoData.repo.description
                ? repoData.repo.description
                : "Descripción no disponible"
            }
          />
          <hr />
          <div className="flex justify-between">
            <button
              onClick={() => handleEdit()}
              className="mt-5 flex justify-between items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            >
              <p className="text-left">Guardar cambios</p>
              <span className="flex items-center"></span>
            </button>
            <button
              onClick={() => handleDelete()}
              className="mt-5 flex justify-between items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            >
              <p className="text-left">Eliminar repositorio</p>
              <span className="flex items-center"></span>
            </button>
          </div>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </div>
      ) : (
        <p className="dark:text-white">Cargando...</p>
      )}

      <Toaster theme="system" richColors />
    </div>
  );
}

export default page;
