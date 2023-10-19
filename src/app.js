const express = require("express");
const dotenv = require("dotenv");
const apiRoutes = require("./api/_api");
const middleware = require("./middleware/_middleware");

const env = dotenv.config().parsed;
const logger = middleware.logs.logger;
const app = express();

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);
apiRoutes.configureApiRoutes(app, express, env.API_VERSION);
middleware.errors.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));
