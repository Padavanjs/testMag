const { application } = require("express");
const express = require("express");
require("dotenv").config();
const { urlencoded } = require("body-parser");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = require("./Router/router");
const errorHandler = require("./shared/handlers/errorHandler");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(urlencoded({ extended: false }));
app.use("/API", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server started on port ${port} `);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
