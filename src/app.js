const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const middleware = require("./middleware");
const shared = require("./shared");

const { parsed: env } = dotenv.config();
const app = express();

middleware.useLoggers(app);
middleware.useSecurity(app);
routes.configure(app, express, env.API_VERSION);
middleware.handleErrors(app, middleware.logger);
shared.db.sequelize;
const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => middleware.logger.info(startMessage));
