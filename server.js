const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiController = require("./controllers/api-controller");
const htmlController = require("./controllers/html-controller");

app.use(express.static("public"));
app.use(apiController);
app.use(htmlController);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = app;
