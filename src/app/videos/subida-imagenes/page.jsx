"use client";
import React, { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import { Toaster, toast } from "sonner";

function Page() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      throw new Error("Por favor, selecciona una imagen.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("../../../api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen.");
      }

      const data = await response.json();

      setImageUrl(data.url);
      return data; // Devuelve los datos para la resolución exitosa de la promesa
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para la resolución fallida de la promesa
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(handleUpload(), {
        loading: "Subiendo imagen...",
        success: "Imagen subida satisfactoriamente.",
        error: "Error al subir la imagen.",
      });
    } catch (error) {
      toast.error(error.message); // Mostrar mensaje de error si no se selecciona un archivo
    }
  };

  return (
    <div>
      <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white bg-gray-200">
        <div className="text-4xl font-bold dark:text-white text-black mb-5">
          Selecciona una imagen:
        </div>
        <div className="text-2xl font-bold dark:text-white text-black">
          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-white shadow-md rounded-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 font-semibold mb-2"
              >
                Seleccionar archivo:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Enviar
              </button>
            </div>
          </form>

          <div className="p-8 mb-10 dark:bg-gray-900 dark:text-white bg-gray-200">
            {imageUrl && <img src={imageUrl} alt="gato :3" />}
          </div>
          <div className="mb-4">Solución error:</div>
          <div className="text-lg mb-7">
            - error StaticGenBailoutError: Page with `dynamic = "error"`
            couldn't be rendered statically
          </div>
          <CodeBlock
            code="/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  'output' : 'standalone'
}
 
module.exports = nextConfig"
            language="JavaScript - (next.config.js)"
          ></CodeBlock>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Page;
