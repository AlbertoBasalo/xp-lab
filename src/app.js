const express = require("express");
const dotenv = require("dotenv");
const middleware = require("./middleware");
const routes = require("./routes");
const shared = require("./shared");

const { parsed: env } = dotenv.config();
const app = express();

middleware.useLoggers(app);
middleware.useSecurity(app);
routes.configure(app, express, env.API_VERSION);
middleware.handleErrors(app, middleware.logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => middleware.logger.info(startMessage));
