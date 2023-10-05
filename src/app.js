const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const middleware = require("./middleware");

const { parsed: env } = dotenv.config();
const app = express();

middleware.useSecurity(app);
routes.configure(app, express, env.API_VERSION);
middleware.handleErrors(app, middleware.logger);

app.listen(env.PORT, () => middleware.logger.info(`Listening on ${env.PORT}, ${env.NODE_ENV} environment`));
