const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const middleware = require("./middleware");

const { parsed: env } = dotenv.config();
const logger = middleware.logs.logger;
const app = express();

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);
routes.configureAppRoutes(app, express, env.API_VERSION);
middleware.errors.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));
