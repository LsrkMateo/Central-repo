"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function RepoRegisterForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    fetch("../api/repos/uploadRepo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, author: session.user.name }),
    });
    router.push("/proyectos");
  };
  return (
    <div className="dark:bg-black shadow-lg p-5 rounded-lg border-t-4 mt-5 border-green-400">
      <h1 className="text-3xl font-bold my-4 dark:text-white">
        Crear nuevo proyecto:
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 dark:text-white"
      >
        <h3 className=" font-bold text-md mt-5  dark:text-white">
          Nombre del proyecto:
        </h3>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre"
          className="dark:bg-black p-2 w-full"
        />
        <h3 className=" font-bold text-md mt-5  dark:text-white">
          Descripcion del proyecto:
        </h3>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Descripcion"
          className="dark:bg-black p-2 w-full"
        />
        <button
          onClick={() => {
            if (!name || !description) {
              setError("Todos los campos son nescesarios");
            }
          }}
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 mt-2"
        >
          Crear repositorio
        </button>
      </form>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
