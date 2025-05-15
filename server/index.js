const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/cartRoute");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://nishmas-restaurant.vercel.app/',
  credentials: true,
}));
app.use(express.json());

// Environment variables
const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

// MongoDB connection and server start
const startServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful");

    // Routes
    app.use("/api/auth", userRoute);
    app.use("/api/cart", cartRoute);

    // Start listening AFTER DB connects
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (err) {
    console.error("Mongo connection failed:", err.message);
  }
};

startServer();