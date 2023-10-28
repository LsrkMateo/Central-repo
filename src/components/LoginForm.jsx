"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
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

  return (
    <div className="grid place-items-center h-screen">
      <div className="dark:bg-black shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="dark:text-white text-xl font-bold my-4">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 dark:text-white"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="dark:bg-black p-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="dark:bg-black p-2"
          />
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login with Google
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login with GitHub
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
