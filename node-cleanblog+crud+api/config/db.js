const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  const uri = process.env.DB_URL;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

module.exports = connectDB;
