const express = require("express");
const dotenv = require("dotenv");
const middleware = require("./middleware/middleware.index");
const api = require("./api/api.router");
const shared = require("./shared/shared.index");

const { parsed: env } = dotenv.config();
const app = express();

middleware.useLoggers(app);
middleware.useSecurity(app);
api.useRouters(app, express, env.API_VERSION);
middleware.useErrorHandler(app, middleware.logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => middleware.logger.info(startMessage));
