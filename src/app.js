const express = require("express");
const routes = require("./routes/v1");
const { logger, security } = require("./middleware");
const { error } = require("./shared");
// ToDo: use environment variables
const PORT = 3000;

const app = express();
security.configure(app);
routes.configure(app);
error.configure(app, logger);

app.listen(PORT, () => logger.info(`Listening on ${PORT}, ${process.env.NODE_ENV} environment`));
