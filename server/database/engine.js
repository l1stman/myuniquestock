const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Perform operations on the database
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
