"use client";
import { Toaster, toast } from "sonner";
import { BiCheck } from "react-icons/bi";
function page() {
  return (
    <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white bg-gray-200">
      <h1 className="text-4xl font-bold dark:text-white text-black mb-5">
        hola :D
      </h1>
      <button
        onClick={() => {
          toast("Terminos aceptados", {
            description: "gracias por aceptar los terminos y condiciones",
            icon: <BiCheck />,
          });
        }}
      >
        click aqui 
      </button>
      <Toaster />
    </div>
  );
}

export default page;
