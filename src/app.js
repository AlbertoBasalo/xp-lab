const express = require("express");
const routes = require("./routes");
const middleware = require("./middleware");
// ToDo: use environment variables
const PORT = 3000;

const app = express();
middleware.security.configure(app);
routes.configure(app, express);
middleware.error.configure(app, middleware.logger);

app.listen(PORT, () => middleware.logger.info(`Listening on ${PORT}, ${process.env.NODE_ENV} environment`));
