require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
//Crear el sevidor
const app = express();
//configurar cors
app.use(cors());
//Lectura del body
app.use(express.static("public"));
//Carpeta Publica

app.use(express.json());
//Base de datos
dbConnection();
//rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
