"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "../../components/Card";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import { getUserInfo } from "../../../utils/userCrud";
import Users from "../../components/users";

function Page() {
  const { data: session } = useSession();
  const [ bannerVisibility, setBannerVisibility ] = useState(true);
  const [userInfor, setuserInfor] = useState("");
  const [filterBy, setFilterBy] = useState(""); // Estado para almacenar la opción de filtrado seleccionada
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
  const [sortBy, setSortBy] = useState(""); // Estado para controlar el orden de los datos
  const [showProperties, setShowProperties] = useState(false); // Estado para mostrar/ocultar el submenú de Propiedades
  const [propertiesFilter, setPropertiesFilter] = useState(""); // Estado para la opción seleccionada en el submenú de Propiedades
  const [mensajeEnviado, setmensajeEnviado] = useState(false);

  const closeBanner = () => {};
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
    "https://api.github.com/repos/linuxmint/cinnamon",
    "https://api.github.com/repos/michalsnik/aos",
    "https://api.github.com/repos/ubuntu/ubuntu-make",
    "https://api.github.com/repos/Nikhilthadani/nextjs-13-full-stack-blog",
    "https://api.github.com/repos/LsrkMateo/next-js-mongodb",
  ];

  const [repoData, setRepoData] = useState([]);

  const getRepo = async (url) => {
    try {
      const response = await axios.get(url);
      setRepoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    linkArray.forEach(getRepo);
  }, []);
  const handleCardClick = (url) => {
    router.push(`${url}`);
  };

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
        filtered = filtered.filter(
          (data) =>
            data.language &&
            data.language.toLowerCase().includes(searchText.toLowerCase())
        );
        if (!mensajeEnviado) {
          toast("No se incluiran proyectos sin lenguaje");
        }
        setmensajeEnviado(true);
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

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      {!session && bannerVisibility ? (
        <div
          id="marketing-banner"
          tabIndex={-1}
          className="fixed mt-10 z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
        >
          <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <a
              href="/"
              className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 me-2"
                alt="Flowbite Logo"
              />
            
            </a>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              Comparte tus conocimientos! analiza y aprende de millones de
              proyectos alrededor del mundo
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <a
              href="/register"
              className="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Registrate
            </a>
            <button
              onClick={() => setBannerVisibility(!bannerVisibility)}
              data-dismiss-target="#marketing-banner"
              type="button"
              className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      ) : ''} 

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
            className="mx-0 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
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
            <label className="block mt-3 text-gray-700 dark:text-white">
              Filtrar por Propiedades:
            </label>
            <select
              value={propertiesFilter}
              onChange={handlePropertiesFilterChange}
              className="mx-0 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
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
          <label className="block mt-3 text-gray-700 dark:text-white">
            Ordenar por:
          </label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mx-0 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 pl-3 pr-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
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
      <div className=" w-full my-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      {/*---*/}
      <div className="mb-3 dark:text-white">
        Repositorios con estrellas:
        {!session ? (
          <span className="px-4"> cargando sesion... </span>
        ) : !userInfor ? (
          <span className="px-4"> cargando usuario... </span>
        ) : (
          <span> {userInfor.stars}</span>
        )}
      </div>

      {/* Grid de tarjetas
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
      </div> */}

      <hr />

      <Users />

      <Toaster theme="system" richColors />
    </div>
  );
}

export default Page;
