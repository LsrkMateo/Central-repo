"use client";
import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";
function Page() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  return (
    <div>
      <div className="min-h-screen p-8 dark:bg-gray-950 dark:text-white bg-gray-200">
      <div className="text-5xl font-bold dark:text-white text-black mb-5">
        Selecciona la imagen que quieras :D
        </div>
        <div className="text-4xl font-bold dark:text-white text-black">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData();
              formData.append("file", file);

              const response = await fetch("../../../api/upload", {
                method: "POST",
                body: formData,
              });
              const data = await response.json();

              setImageUrl(data.url);
            }}
          >
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button className="mb-20"> Enviar </button>
          </form>
          <div className="p-8 mb-10 dark:bg-gray-900 dark:text-white bg-gray-200">
            {imageUrl && <img src={imageUrl} alt="gato :3" />}
          </div>
          <div className="mb-4">Solucion error:</div>
          <div className="text-lg mb-7">
            - error StaticGenBailoutError: Page with `dynamic = "error"`
            couldn't be rendered statical
          </div>
          <CodeBlock
            code="/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  'output' : 'standalone'
}
 
module.exports = nextConfig"
            language="JavaScript"
          ></CodeBlock>
        </div>
      </div>
    </div>
  );
}

export default Page;
