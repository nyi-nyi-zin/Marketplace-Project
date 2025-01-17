require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

//routes imports
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

const storageConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "_" + file.originalname);
  },
});

const filterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/png " ||
    file.mimetype === "image/jpg " ||
    file.mimetype === "image/jpeg "
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

//global middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(
  multer({ storage: storageConfig, fileFilter: filterConfig }).array(
    "product_images"
  )
);

app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running at port 4000");
});
