export function getUserInfo(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Si la solicitud se realiza con éxito (código 200), parsea la respuesta JSON
        const { user } = await response.json();

        console.log("Información del usuario:", user);
        resolve(user); // Resuelve la promesa con los datos del usuario
      } else {
        // Si la solicitud no se realiza con éxito, maneja el error de acuerdo a tus necesidades
        console.error("Error al obtener la información del usuario");
        reject("Error al obtener la información del usuario"); // Rechaza la promesa con un mensaje de error
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error("Error durante la solicitud GET:", error);
      reject(error); // Rechaza la promesa con el error capturado
    }
  });
}

