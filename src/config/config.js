const dotEnv = require("dotenv");
const nodemailer = require("nodemailer");
dotEnv.config();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: _config.EMAIL_USER,
    pass: _config.EMAIL_PASS,
  },
});
const config = Object.freeze(_config);

module.exports = { config, transporter };
