import React from "react";

function Page() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4">
      <p className="mb-4">
        La API de GitHub permite a los desarrolladores interactuar con la
        plataforma GitHub de forma programática, lo que significa que puedes
        realizar operaciones como crear repositorios, acceder a datos de
        repositorios, administrar problemas y mucho más a través de solicitudes
        HTTP en lugar de usar la interfaz web. Aquí te proporcionaré una breve
        descripción de cómo hacer uso de la API de GitHub:
      </p>
      <ol className="list-decimal pl-4 mb-6">
        <li className="mb-2">
          <span className="font-semibold">Autenticación:</span> Antes de
          comenzar a usar la API de GitHub, debes autenticarte para poder
          realizar acciones en nombre de un usuario o una organización. GitHub
          admite varios métodos de autenticación, como el uso de tokens de
          acceso personal (Personal Access Tokens) o autenticación OAuth.
        </li>
        <li className="mb-2">
          <span className="font-semibold">Endpoints de la API:</span> La API de
          GitHub se basa en endpoints, que son URLs específicas que representan
          diferentes recursos y acciones en la plataforma. Cada endpoint
          corresponde a una operación específica, como obtener información de un
          repositorio, crear un problema o realizar una solicitud de extracción
          (pull request).
        </li>
        <li className="mb-2">
          <span className="font-semibold">Hacer solicitudes HTTP:</span> Utiliza
          una biblioteca o herramienta que te permita hacer solicitudes HTTP a
          los endpoints de la API de GitHub. Esto puede hacerse a través de
          lenguajes de programación como Python, JavaScript, Ruby, etc., o
          mediante herramientas como curl o Postman.
        </li>
        <li className="mb-2">
          <span className="font-semibold">Recibir y procesar respuestas:</span>{" "}
          Una vez que hayas hecho una solicitud a un endpoint, recibirás una
          respuesta en formato JSON que contiene los datos solicitados o la
          confirmación de que se realizó la acción deseada. Debes procesar esta
          respuesta según tus necesidades.
        </li>
      </ol>
      <p className="mb-4">
        Ejemplos de operaciones comunes que puedes realizar con la API de GitHub
        incluyen:
      </p>
      <ul className="list-disc pl-4 mb-6">
        <li className="mb-2">
          <span className="font-semibold">
            Obtener información de un repositorio:
          </span>{" "}
          Puedes obtener detalles sobre un repositorio específico, como su
          nombre, descripción, colaboradores, etc., utilizando el endpoint
          /repos/:owner/:repo.
        </li>
        <li className="mb-2">
          <span className="font-semibold">Crear un nuevo repositorio:</span>{" "}
          Puedes crear un nuevo repositorio en tu cuenta o en una organización
          usando el endpoint /user/repos o /orgs/:org/repos, respectivamente.
        </li>
        <li className="mb-2">
          <span className="font-semibold">Administrar problemas (issues):</span>{" "}
          Puedes crear, listar, cerrar o actualizar problemas utilizando los
          endpoints relacionados con problemas, como /repos/:owner/:repo/issues.
        </li>
        <li className="mb-2">
          <span className="font-semibold">
            Realizar solicitudes de extracción (pull requests):
          </span>{" "}
          Puedes crear solicitudes de extracción, revisarlas y fusionarlas
          usando los endpoints relacionados con solicitudes de extracción, como
          /repos/:owner/:repo/pulls.
        </li>
      </ul>
      <p className="mb-4">
        Recuerda que es importante leer y comprender la documentación oficial de
        la API de GitHub para conocer los detalles de autenticación, endpoints
        disponibles y ejemplos de uso. Además, ten en cuenta que GitHub puede
        cambiar su API con el tiempo, por lo que es importante mantenerse
        actualizado con las últimas versiones y cambios en la API.
      </p>
    </div>
  );
}

export default Page;
