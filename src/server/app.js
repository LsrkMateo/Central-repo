const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/getGameInfo", async (req, res) => {
  const app_id = "1942120";
  const steamApiKey = "tu_clave_de_api_de_steam";

  try {
    const response = await axios.get(
      `https://api.steampowered.com/ISteamApps/GetAppDetails/v1/?appids=${app_id}&key=${steamApiKey}`
    );
    const data = response.data[app_id];

    if (data.success) {
      res.json(data.data);
    } else {
      res
        .status(404)
        .json({ error: "No se encontraron datos para la aplicación" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en la solicitud a la Steam API" });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
