"use client";

function Juegos() {
  const axios = require("axios");

  // ID de la aplicación del juego específico
  const app_id = "1942120";

  // URL de la Steam Web API para obtener detalles de la aplicación
  const url = `https://api.steampowered.com/ISteamApps/GetAppDetails/v1/?appids=${app_id}`;

  // Realizar la solicitud GET
  axios
    .get(url)
    .then((response) => {
      // Comprobar si la solicitud fue exitosa
      if (response.status === 200) {
        const data = response.data;

        // Comprobar si los datos del juego están disponibles
        if (app_id in data && data[app_id]["success"]) {
          const game_data = data[app_id]["data"];

          // Acceder a la información específica que necesitas
          const game_name = game_data["name"];
          const game_description = game_data["detailed_description"];
          const game_news = game_data["news"]?.["items"] || [];

          console.log(`Nombre del juego: ${game_name}`);
          console.log(`Descripción del juego: ${game_description}`);

          if (game_news.length > 0) {
            console.log("\nÚltimas noticias del juego:");
            game_news.forEach((news_item) => {
              console.log(`- ${news_item["title"] || "Sin título"}`);
            });
          } else {
            console.log("No hay noticias disponibles para este juego.");
          }
        } else {
          console.log(
            `No se encontraron datos para la aplicación con ID ${app_id}`
          );
        }
      } else {
        console.log(`Error en la solicitud GET: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud GET:", error);
    });

  return (
    <div className={`min-h-screen p-8`}>
      <div className={`text-4xl font-bold mb-4`}>Juegos??</div>
      <div className={`mb-4`}>
        asi es, aqui colocare los juegos que me parecen en extremo divertidos,
        la otra finalidad de esto es tener un control de los juegos que voy
        jugando, dar mi opinion, ademas intentare consumir quizas (si hay) la
        api de steam o gamejolt
      </div>
    </div>
  );
}

export default Juegos;
