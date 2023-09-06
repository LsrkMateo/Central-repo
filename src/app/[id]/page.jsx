"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

function Repositorio() {
  const params = useParams();
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repositories/${params.id}`)
      .then((response) => {
        setRepoData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del repositorio:", error);
      });
  }, [params.id]);

  return (
    <div className="min-h-screen p-8 dark:bg-gray-950 bg-gray-100">
      {repoData ? (
        <div className={` p-4 rounded shadow-lg dark:bg-gray-900 bg-gray-200`}>
          <h1
            className={`text-3xl font-semibold mb-4 dark:text-white text-gray-900`}
          >
            {repoData.name}
          </h1>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Descripción: {repoData.description || "Sin descripción"}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Propietario: {repoData.owner.login}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            URL:{" "}
            <a
              href={repoData.html_url}
              className={`dark:text-blue-400 text-blue-600`}
            >
              {repoData.html_url}
            </a>
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Repositorio Privado: {repoData.private ? "Sí" : "No"}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Lenguaje: {repoData.language || "No especificado"}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Watchers: {repoData.watchers_count}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Forks: {repoData.forks_count}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Estrellas: {repoData.stargazers_count}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Último push el: {new Date(repoData.pushed_at).toLocaleDateString()}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Tamaño: {repoData.size} KB (o {Math.round(repoData.size / 1024)} MB)
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Problemas abiertos: {repoData.open_issues_count}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Tiene wiki: {repoData.has_wiki ? "Sí" : "No"}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Licencia:{" "}
            {repoData.license ? repoData.license.name : "No especificada"}
          </p>
          <p className={` mb-2 dark:text-gray-400 text-gray-700`}>
            Git URL: {repoData.git_url}
          </p>
          {/* Agrega más detalles según sea necesario */}
        </div>
      ) : (
        <div className={`text-center dark:text-gray-400 text-gray-700`}>
          Cargando...
        </div>
      )}
    </div>
  );
}

export default Repositorio;
