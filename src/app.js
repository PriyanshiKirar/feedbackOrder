const express = require("express");
const morgan = require("morgan");
const orderRoutes = require("./routes/orderRoutes.js");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRoutes);

module.exports = app;
