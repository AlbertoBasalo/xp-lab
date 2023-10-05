const cors = require("cors");
const helmet = require("helmet");

function configure(app) {
  app.use(cors());
  app.use(helmet());
}

module.exports = { configure };
