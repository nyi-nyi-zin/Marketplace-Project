require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routes imports
const authRoutes = require("./routes/auth");

const app = express();

//global middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running at port 4000");
});
