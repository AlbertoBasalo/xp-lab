const express = require("express");
const env = require("dotenv").config().parsed;

const api = require("./api/api.router");
const middleware = require("./middleware/middleware.index");
const shared = require("./shared/shared.index");

const logger = shared.utils.logger;
const app = express();

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);
api.useRouters(app, env.API_VERSION);
middleware.errors.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));
