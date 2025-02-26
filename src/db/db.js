const mongoose = require("mongoose");
const { config } = require("../config/config");

async function connect() {
  await mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
}

module.exports = connect;
