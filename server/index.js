const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require('./Routes/userRoute');
const cartRoute = require('./Routes/cartRoute')
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://nishmas-restaurant.vercel.app/',
  credentials: true
}));
app.use(express.json());


const uri = process.env.MONGO_URL
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB Connetion Successfull");
      })
      .catch((err) => {
        console.log(err.message);
      });


     app.use('/api/auth', userRoute );
    app.use('/api/cart', cartRoute);

  } catch (err) {
    console.log("Mongo connection failed");
  }

}
startServer(); // starting mongoDB
const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);
