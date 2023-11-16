"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { BiLogoGoogle, BiLogoGithub } from "react-icons/bi";
import { useRouter } from "next/navigation"; // Cambio aquí: 'next/navigation' a 'next/router'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Agregar lógica para la autenticación por correo y contraseña aquí si es necesario
  };
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google");
      if (!res.error) {
        // La autenticación con Google fue exitosa
        router.replace("/dashboard"); // Redirige a la página de dashboard
      } else {
        setError("Failed to sign in with Google");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white my-4">
          Iniciar sesion
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="name@company.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>
          <button
            onClick={async () => {
              try {
                const res = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });

                if (res.error) {
                  setError("Invalid Credentials");
                  return;
                } else {
                  router.replace("/dashboard");
                }
              } catch (error) {
                console.log(error);
              }
            }}
            className="w-full font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Iniciar sesion
          </button>
          <div className="flex gap-5">
            <button
              onClick={() => handleGoogleLogin()}
              className="flex items-center w-full justify-center hover:bg-green-700 bg-green-600 text-sm text-white font-bold cursor-pointer px-6 py-2"
            >
              <span className="mr-2">
                <BiLogoGoogle />
              </span>
              <h1>Google</h1>
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await signIn("github");
                  if (!res.error) {
                    // La autenticación con GitHub fue exitosa
                    router.replace("/dashboard"); // Redirige a la página de dashboard
                  } else {
                    setError("Failed to sign in with GitHub");
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
              className="flex items-center w-full justify-center hover:bg-green-700 bg-green-600 text-sm text-white font-bold cursor-pointer px-6 py-2"
            >
              <span className="mr-2">
                <BiLogoGithub />
              </span>
              <h1>Github</h1>
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            No tienes una cuenta?
            <Link
              href={"/register"}
              className="text-blue-700 hover:underline dark:text-blue-500 m-2"
            >
              Registrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
