"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="dark:bg-black shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 dark:text-white">Register</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 dark:text-white"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="dark:bg-black p-2"
          />
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            onClick={() => {
              if (!name || !email || !password) {
                setError("All fields are necessary.");
                return;
              }
              if (user) {
                setError("User already exists.");
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login with Google
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
