const app = require("./src/app.js");
const { config } = require("./src/config/config.js");

const connect = require("./src/db/db.js");
connect();

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);
});
