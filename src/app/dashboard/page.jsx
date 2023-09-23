"use client";
import React from "react";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      {session ? (
        <div>
          Hola {session.user.name}! <br /> <br />
          Bienvenido, este es la pagina de tu perfil, accede a ella cada vez que
          quieras acceder o configurar detalles de tu cuenta. <br /> Eecuerda
          que este proyecto no es mas que una recopilacion de distintos
          proyectos, por lo que sientete libre de juzgar y compartir tus
          opiniones! persona!
        </div>
      ) : (
        <div>No hay sesión activa.</div>
      )}
    </div>
  );
}

export default Page;
