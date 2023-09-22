"use client";
import { Toaster, toast } from "sonner";
import { BiCheck } from "react-icons/bi";

function uploadSomething() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}
function page() {
  return (
    <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white bg-gray-200">
      <div className="dark:text-gray-400 text-gray-700 mb-4">
        toast es usado tambien por ejemplo en{" "}
        <a className="text-blue" href="./subida-imagenes">
          Video: subida de imagenes con cludinary
        </a>
      </div>
      <h1 className="text-4xl font-bold dark:text-white text-black mb-5">
        Mensajes toast
      </h1>
      <div className="flex flex-wrap gap-5 ">
        <button
          onClick={() => {
            toast.error("Algo salio mal");
          }}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Error!
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            toast.success("El proceso finalizo correctamente");
          }}
        >
          Correcto!
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            toast("Quieres aceptar los terminos?", {
              action: {
                label: "Aceptar",
                onClick: () => {
                  toast("terminos aceptados :D");
                },
              },
            });
          }}
        >
          Aceptar
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            toast.promise(uploadSomething, {
              success: "Archivo cargado correctamente",
              error: "Ocurrio un error al cargar el archivo",
              loading: "cargando el archivo",
            });
          }}
        >
          promesa
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            toast(
              <div>
                <h1>titulo</h1>
                hola :D
                <ul>
                  <li>este es un intem</li>
                  <li>este es otro item</li>
                </ul>
              </div>
            );
          }}
        >
          interfaz personalizada!
        </button>
      </div>
      <Toaster theme="system" richColors/>
    </div>
  );
}

export default page;
