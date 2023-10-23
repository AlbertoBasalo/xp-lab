const express = require("express");
const api = require("./api/api.router");
const env = require("dotenv").config().parsed;
const middleware = require("./middleware/middleware.index");

const logger = middleware.logs.logger;

const app = express();
app.use(express.json());

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);

api.useRouters(app, env.API_VERSION);

middleware.errors.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));
