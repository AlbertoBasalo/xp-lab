const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const middleware = require("./middleware");

const { parsed: env } = dotenv.config();
const app = express();

middleware.security.configure(app);
routes.configure(app, express, env.apiVersion);
middleware.error.configure(app, middleware.logger);

app.listen(env.PORT, () => middleware.logger.info(`Listening on ${env.PORT}, ${env.NODE_ENV} environment`));
