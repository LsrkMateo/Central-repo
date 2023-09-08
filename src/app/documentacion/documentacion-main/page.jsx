"use client";

import React from "react";
import CodeBlock from "@/components/CodeBlock";
function DocumentacionMain() {
  return (
    <div
      className={`min-h-screen p-8 bg-gray-100 dark:bg-gray-950 `}
    >
      <div
        className={`text-3xl font-bold mb-4 mt-4 text-gray-900 dark:text-gray-200`}
      >
        Manejo del modo oscuro:
      </div>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        Este código ejemplifica cómo implementar el modo oscuro en una
        aplicación web utilizando Tailwind CSS y React. Detecta automáticamente
        el tema del sistema del usuario y ajusta la interfaz en consecuencia.
      </div>
      <CodeBlock
        code="const [darkMode, setDarkMode] = useState(false);"
        language="Javascript"
        copyable={true}
      ></CodeBlock>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        El estado darkMode controla el modo oscuro, que se puede alternar con un
        botón.
      </div>
      <CodeBlock
        code="const toggleDarkModeFunc = () => {
          const newDarkMode = !darkMode;
          setDarkMode(newDarkMode);
        };
        "
        language="Javascript"
        copyable={true}
      ></CodeBlock>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        Es importante destacar que en Next.js, no se puede guardar la elección
        del tema del usuario en el almacenamiento local (localStorage) porque
        Next.js se ejecuta en el servidor y window.localStorage solo está
        disponible en el lado del cliente.
      </div>
      <CodeBlock
        code="// UseEffect para detectar el tema del sistema al cargar la página
        useEffect(() => {
          if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ) {
            setDarkMode(true);
          }
        }, []);
        "
        language="Javascript"
        copyable={true}
      ></CodeBlock>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        Por lo tanto, cada vez que un usuario visite la página, se volverá a
        detectar automáticamente el tema del sistema y se aplicará el modo claro
        u oscuro en función de esa detección. Esto asegura una experiencia
        coherente y adaptativa para todos los usuarios.
      </div>
      <CodeBlock
        code="// UseEffect para aplicar el modo oscuro al cambiar darkMode
        useEffect(() => {
          if (darkMode) {
            document.querySelector('html').classList.add('dark');
          } else {
            document.querySelector('html').classList.remove('dark');
          }
        }, [darkMode]);
        
        "
        language="Javascript"
        copyable={true}
      ></CodeBlock>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        Este enfoque garantiza que los usuarios disfruten de una experiencia
        visual cómoda según sus preferencias, sin necesidad de almacenar datos
        de preferencia en el cliente.
      </div>
      <div
        className={`text-2xl font-bold mb-4 mt-4 text-gray-900 dark:text-gray-200`}
      >
        Explicacion a profundidad al error ReferenceError: localStorage is not
        defined:
      </div>
      <div className={`mb-2 text-gray-700 dark:text-gray-200`}>
        OEl objeto window en JavaScript es una referencia al objeto global del
        navegador y proporciona acceso a una variedad de funcionalidades
        relacionadas con el navegador, como la manipulación del DOM, el manejo
        de eventos y la gestión de ventanas y frames. Sin embargo, en el
        contexto de Next.js, el objeto window no está disponible de la misma
        manera que lo está en un entorno de navegador estándar. Esto se debe a
        que Next.js está diseñado para ser un framework de renderizado del lado
        del servidor (SSR) y también admite la representación del lado del
        cliente (CSR) cuando es necesario.
        <br /> <br />
        Aquí hay algunas razones por las cuales el objeto window no está
        disponible en todos los contextos de Next.js: <br /> <br />
        1. Renderizado del lado del servidor (SSR): Cuando se realiza una
        solicitud a una página de Next.js, la página se renderiza en el servidor
        antes de enviarla al navegador. En este momento, no hay un objeto window
        disponible porque no estamos en el contexto de un navegador. El código
        que depende de window solo se puede ejecutar en el cliente, no en el
        servidor. <br /> <br />
        2. CSR selectivo: Next.js admite el CSR selectivo, lo que significa que
        puedes optar por renderizar ciertas partes de tu aplicación en el
        cliente en lugar de en el servidor. Esto se hace para mejorar el
        rendimiento y la experiencia del usuario. Cuando se utiliza el CSR
        selectivo, el objeto window está disponible en esas partes de la
        aplicación, pero no en el servidor. <br /> <br />
        3. Compatibilidad con Node.js: Next.js se ejecuta en Node.js en el
        servidor y en el navegador en el cliente. Node.js no tiene un objeto
        window ni las mismas APIs de navegador que un navegador web real. Por lo
        tanto, para mantener la coherencia en el entorno de servidor y cliente,
        ciertas funcionalidades relacionadas con el navegador, como window, no
        están disponibles directamente en el servidor.
      </div>
    </div>
  );
}

export default DocumentacionMain;
