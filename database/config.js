import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse a la BD");
  }
};

export default dbConnection;
