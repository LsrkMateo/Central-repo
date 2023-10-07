"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UserInfo from "../../components/UserInfo";
function Page() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-950">
      {session ? (
        <div className="dark:text-gray-400 text-gray-700 mb-4">
          <div
            className="text-4xl font-bold mb-4 
        dark:text-white text-gray-900"
          >
            Hola {session.user.name}!
          </div>
          <div>
            Bienvenido, este es la pagina de tu perfil, accede a ella cada vez
            que quieras acceder o configurar detalles de tu cuenta. <br />{" "}
            Recuerda que este proyecto no es mas que una recopilacion de
            distintos proyectos, por lo que sientete libre de juzgar y compartir
            tus opiniones!
          </div>
          <UserInfo />
        </div>
      ) : (
        <div>No hay sesión activa.</div>
      )}
    </div>
  );
}

export default Page;
