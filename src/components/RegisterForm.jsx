"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";


export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos los campos son necesarios");
      toast.error("El registro del usuario falló, inténtalo de nuevo");
      return;
    }

    try {
      const [resUserExists, res] = await Promise.all([
        fetch("api/auth/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }),
        fetch("api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }),
      ]);

      const { user } = await resUserExists.json();
      const answer = await res.json();

      if (user) {
        setError("El usuario ya existe");
        toast.error("El registro del usuario falló, inténtalo de nuevo");
      } else if (answer.status == 400) {
        setError(answer.message);
        toast.error("El registro del usuario falló, inténtalo de nuevo");
      } else {
        const form = e.target;
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.log("Error durante el registro: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white my-4">
          Register
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>
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
              Password
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
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              if (!name || !email || !password) {
                setError("All fields are necessary.");
                return;
              }
            }}
          >
            Register
          </button>
          <button
            onClick={async () => {
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
            }}
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
          >
            Login with Google
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <div className="text-sm  font-medium text-gray-500 dark:text-gray-300">
            Ya tienes una cuenta?
            <Link
              href={"/login"}
              className="text-sm ml-2 mt-3 text-right text-blue-700 hover:underline dark:text-blue-500"
            >
              Inicia sesion
            </Link>
          </div>
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
}
