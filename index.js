import express from "express";
import dotenv from "dotenv";

// Conexion a mongoDB
import dbConnection from "./database/config.js";
// importo las rutas de auth
import authRouter from "./routes/auth.js";

// Para leer las variables de entorno en .env
dotenv.config();

// Creo el servidor express
const app = express();

// Conexion a MongoDB
dbConnection();

// Directorio Publico "public" en "/"
app.use(express.static("public"));

// Configuracion del servidor
app.use(express.json());

// Rutas
// TODO: 'auth' // login, register, renew
// TODO: CRUD 'quiz'
app.use("/api/v1/auth", authRouter);

// Ejecuto el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
