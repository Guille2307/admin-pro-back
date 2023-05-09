require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
//Crear el sevidor
const app = express();
//configurar cors
app.use(cors());
//Base de datos
dbConnection();
//rutas

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hola Mundo" });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto" + " " + process.env.PORT);
});
