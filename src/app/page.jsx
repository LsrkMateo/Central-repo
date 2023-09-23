"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import { Toaster, toast } from "sonner";
import { BiArrowToBottom } from "react-icons/bi";

function Page() {
  const [filterBy, setFilterBy] = useState(""); // Estado para almacenar la opción de filtrado seleccionada
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
  const [sortBy, setSortBy] = useState(""); // Estado para controlar el orden de los datos
  const [showProperties, setShowProperties] = useState(false); // Estado para mostrar/ocultar el submenú de Propiedades
  const [propertiesFilter, setPropertiesFilter] = useState(""); // Estado para la opción seleccionada en el submenú de Propiedades

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;

    if (selectedFilter === "propiedades") {
      // Si se selecciona "Propiedades", muestra el submenú
      setShowProperties(true);
    } else {
      // Si se selecciona otra opción, oculta el submenú y limpia el filtro de Propiedades
      setShowProperties(false);
      setPropertiesFilter("");
    }

    setFilterBy(selectedFilter);
    setSearchText(""); // Limpia el texto de búsqueda al cambiar la opción de filtrado
    setFilteredData([]); // Limpia los datos filtrados al cambiar la opción de filtrado
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePropertiesFilterChange = (event) => {
    setPropertiesFilter(event.target.value);
  };

  const router = useRouter();

  const linkArray = [
    "https://api.github.com/repos/LsrkMateo/Rick-and-morty-api",
    "https://api.github.com/repos/getcursor/cursor",
    "https://api.github.com/repos/nextauthjs/next-auth",
    "https://api.github.com/repos/LsrkMateo/next-js-mongodb",
    "https://api.github.com/repos/LsrkMateo/Hashnode-blogs",
    "https://api.github.com/repos/LsrkMateo/database-test",
    "https://api.github.com/repos/LsrkMateo/Nextjs-ga-test",
    "https://api.github.com/repos/LsrkMateo/Docker---apache",
    "https://api.github.com/repos/LsrkMateo/python-CLI-proyect",
  ];

  const [repoData, setRepoData] = useState([]);
  console.log(process.env.PRUEBA);

  const getRepo = async (url) => {
    try {
      const response = await axios.get(url);
      setRepoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (url) => {
    router.push(`${url}`);
  };

  useEffect(() => {
    linkArray.forEach(getRepo);
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = [...repoData];

      if (filterBy === "nombre") {
        // Filtra por nombre
        filtered = filtered.filter((data) =>
          data.name.toLowerCase().includes(searchText.toLowerCase())
        );
      } else if (filterBy === "autor") {
        // Filtra por autor
        filtered = filtered.filter((data) =>
          data.owner.login.toLowerCase().includes(searchText.toLowerCase())
        );
      } else if (filterBy === "lenguaje") {
        // Filtra por lenguaje, solo si data.language no es null
        toast.success("No se incluiran proyectos sin lenguaje");
        filtered = filtered.filter(
          (data) =>
            data.language &&
            data.language.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // Filtra por Propiedades si se selecciona la opción correspondiente
      if (filterBy === "propiedades" && propertiesFilter === "visibility") {
        filtered = filtered.filter((data) => data.visibility === "public");
      } else if (filterBy === "propiedades" && propertiesFilter === "private") {
        filtered = filtered.filter((data) => data.visibility === "private");
      }

      // Ordena los datos según la opción de ordenamiento seleccionada
      if (sortBy === "mas_visto") {
        filtered.sort((a, b) => b.watchers - a.watchers); // De mayor a menor
      } else if (sortBy === "menos_visto") {
        filtered.sort((a, b) => a.watchers - b.watchers); // De menor a mayor
      } else if (sortBy === "mas_reciente") {
        filtered.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)); // De más reciente a menos reciente
      } else if (sortBy === "menos_reciente") {
        filtered.sort((a, b) => new Date(a.pushed_at) - new Date(b.pushed_at)); // De menos reciente a más reciente
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [searchText, filterBy, repoData, sortBy, propertiesFilter]);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      {/* Sección en la parte superior */}
      <div className="flex items-center justify-between flex-wrap my-0">
        {/*opciones de filtracion*/}
        <div className=" w-auto">
          <label className="block text-gray-700 dark:text-white">
            Filtrar por:
          </label>
          <select
            value={filterBy}
            onChange={handleFilterChange}
            className=" w-auto mx-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          >
            <option value="">Seleccione una opcion de filtracion</option>
            <option value="nombre">Nombre</option>
            <option value="autor">Autor</option>

            <option value="lenguaje">Lenguaje</option>
            <option value="propiedades">Propiedades</option>
          </select>
        </div>
        {/*---*/}
        {/* Submenú de Propiedades */}
        {showProperties && (
          <div className="">
            <label className="block text-gray-700 dark:text-white">
              Filtrar por Propiedades:
            </label>
            <select
              value={propertiesFilter}
              onChange={handlePropertiesFilterChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="">Seleccione una opción</option>
              <option value="visibility">Visibility</option>
              <option value="private">Private</option>
            </select>
          </div>
        )}
        {/*---*/}
        {/* Opciones de ordenamiento */}
        <div className="">
          <label className="block text-gray-700 dark:text-white">
            Ordenar por:
          </label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mx-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          >
            <option value="">Seleccione una opción de ordenamiento</option>
            <option value="mas_visto">Del más visto al menos visto</option>
            <option value="menos_visto">Del menos visto al más visto</option>
            <option value="mas_reciente">
              Del más reciente al menos reciente
            </option>
            <option value="menos_reciente">
              Del menos reciente al más reciente
            </option>
          </select>
        </div>
        {/*---*/}
      </div>
      {/*barra de busqueda*/}
      <div className="relative w-full my-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        />
        <svg
          className="absolute left-3 top-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M13.293 14.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 1.414l3 3a1 1 0 000 1.414z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M9 17a8 8 0 100-16 8 8 0 000 16z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/*---*/}
      {/* Grid de tarjetas */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 hover:cursor-pointer">
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <Card key={index} data={data} handleCardClick={handleCardClick} />
          ))
        ) : (
          <div className={`text-center dark:text-white text-black`}>
            No se encontraron resultados.
          </div>
        )}
      </div>
      <Toaster theme="system" richColors />
    </div>
  );
}

export default Page;
