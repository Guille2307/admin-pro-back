const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("db Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de Iniciar la db");
  }
};

module.exports = { dbConnection };
