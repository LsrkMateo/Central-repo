"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { Toaster, toast } from "sonner";

export default function RepoRegisterForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleNavigation = () => {
    router.back();
  };

  const manejarCambioArchivo = (event) => {
    const archivoSeleccionado = event.target.files[0];

    // Verificar si el archivo es de un tipo permitido
    const tiposPermitidos = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    if (
      archivoSeleccionado &&
      tiposPermitidos.includes(archivoSeleccionado.type)
    ) {
      setArchivo(archivoSeleccionado);

      // Crear una URL temporal para previsualización de la imagen
      const previewUrl = URL.createObjectURL(archivoSeleccionado);
      setImagePreview(previewUrl);
    } else {
      // Restablecer el estado en caso de un tipo de archivo no permitido
      setArchivo(null);
      setImagePreview(null);
      setError(
        "Tipo de archivo no permitido. Selecciona un archivo SVG, PNG, JPG o GIF."
      );
    }
  };

  const manejarArrastreSobre = (e) => {
    e.preventDefault();
  };

  const manejarSoltar = (e) => {
    e.preventDefault();

    const archivoSeleccionado = e.dataTransfer.files[0];

    // Verificar si el archivo es de un tipo permitido
    const tiposPermitidos = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    if (
      archivoSeleccionado &&
      tiposPermitidos.includes(archivoSeleccionado.type)
    ) {
      setArchivo(archivoSeleccionado);

      // Crear una URL temporal para previsualización de la imagen
      const previewUrl = URL.createObjectURL(archivoSeleccionado);
      setImagePreview(previewUrl);
    } else {
      // Restablecer el estado en caso de un tipo de archivo no permitido
      setArchivo(null);
      setImagePreview(null);
      setError(
        "Tipo de archivo no permitido. Selecciona un archivo SVG, PNG, JPG o GIF."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("author", session.user.name);
  
      if (archivo ?? false) {
        // Subir imagen
        formData.append("file", archivo);
  
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Error al subir la imagen: ${uploadResponse.statusText}`);
        }
  
        const uploadResult = await uploadResponse.json();
        toast.message(uploadResult.message);
        formData.append("imageLink", await uploadResult.url);
      }
  
      // Hacer la solicitud POST a '../api/repos/uploadRepo'
      const proyectResponse = await fetch("../api/repos/uploadRepo", {
        method: "POST",
        body: formData,
      });
  
      if (!proyectResponse.ok) {
        throw new Error(`Error al subir el repositorio: ${proyectResponse.statusText}`);
      }
  
      const resProyect = await proyectResponse.json();
      console.log("resProyect", resProyect);
  
      // Manejar la navegación según sea necesario
      handleNavigation();
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
      // Manejar el error según sea necesario
    }
  };
  
  return (
    <div className="dark:bg-black shadow-lg p-5 rounded-lg border-t-4 mt-5 border-green-400">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold  dark:text-white">
          Crear nuevo proyecto:
        </h2>
        <button
          onClick={() => handleNavigation()}
          className="bg-green-600 text-white font-bold cursor-pointer flex items-center px-6 py-2 mb-4"
        >
          <span>
            <BiArrowBack />
          </span>
          <h3 className="ml-2">volver</h3>
        </button>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 dark:text-white"
        onDragOver={manejarArrastreSobre}
        onDrop={manejarSoltar}
        encType="multipart/form-data"
      >
        <h3 className=" font-bold text-md mt-5  dark:text-white">Nombre:</h3>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre"
          className="dark:bg-black p-2 w-full"
        />
        <h3 className=" font-bold text-md mt-5  dark:text-white">
          Descripcion:
        </h3>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Descripcion"
          className="dark:bg-black p-2 w-full"
        />
        <h3 className=" font-bold text-md mt-5  dark:text-white">Imagen: </h3>

        <div className="flex gap-5 justify-around">
          {imagePreview && (
            <div className="flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Vista previa de la imagen"
                className="max-w-full max-h-64 w-full"
              />
            </div>
          )}

          <div
            className={
              imagePreview
                ? "flex items-center justify-center max-w-full max-h-64"
                : "flex items-center justify-center w-full"
            }
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="m-10">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="image"
                onChange={(e) => manejarCambioArchivo(e)}
              />
            </label>
          </div>
        </div>

        <button
          onClick={() => {
            if (!name) {
              setError("El titulo es necesario");
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
      <Toaster />
    </div>
  );
}
