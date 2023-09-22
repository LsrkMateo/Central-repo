import React from "react";
import SubCard from "../../../components/SubCard";
function page() {
  return (
    <div>
      <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white bg-gray-200">
        <div className="text-4xl font-bold mb-4 dark:text-white text-black">
          Contenido extraido de:
        </div>
        <div className="text-2xl font-bold mb-6 dark:text-white text-black">
          Inteligencia Artificial desde cero con Python y Tensorflow (playlist)
        </div>
        <div className="flex flex-wrap">
          <iframe
            className="flex-shrink-1 w-full md:w-1/2 p-3 mb-6"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/videoseries?si=1YZtr01_FTaOK7Q5&amp;list=PLZ8REt5zt2Pn0vfJjTAPaDVSACDvnuGiG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div className="text-m mb-4 text-center dark:text-white text-black w-full md:w-1/2 p-3 place-self-center dark:bg-gray-900 bg-gray-400">
            Este contenido ha sido usado para generar la documentacion a
            continuacion, cada concepto sera enlazado con una pagina relacionada
            con el tema
          </div>
        </div>
        <div className="grid gap-4" >
          <SubCard href={"/documentacion/machinelearning/primera-red-neuronal"}>
            1) Primera red neuronal, usando Tensorflow
          </SubCard>
          <SubCard href={"/documentacion/machinelearning/clasificador-simple"}>
            2) Clasificador de imagenes simple (no convolucional)
          </SubCard>
          <SubCard href={"/documentacion/machinelearning/redes-exportacion"}>
            3) Exportacion de modelos a paginas web (Tensorflow.js)
          </SubCard>
          <SubCard
            href={"/documentacion/machinelearning/clasificador-convolucional"}
          >
            4) Clasificacion de imagenes avanzada (convolucional)
          </SubCard>
          <SubCard
            href={"/documentacion/machinelearning/clasificador-perros-gatos"}
          >
            5) Clasificador de perros y gatos
          </SubCard>
          <SubCard href={"/documentacion/machinelearning/derivadas"}>
            6) Derivadas
          </SubCard>
        </div>
      </div>
    </div>
  );
}

export default page;
