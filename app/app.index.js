const express = require("express");
const env = require("dotenv").config().parsed;

const api = require("./api/api.router");
const middleware = require("./middleware/middleware.index");
const shared = require("./shared/shared.index");

const app = express();
const logger = shared.utils.logger;

// deleteTablesContentSequelize();

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);
api.useRouters(app, env.API_VERSION);
middleware.errorHandler.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));

async function deleteTablesContentSequelize() {
  const bookingsRepository = shared.db.bookingsRepository;
  await bookingsRepository.deleteAll();
  const activitiesRepository = shared.db.activitiesRepository;
  await activitiesRepository.deleteAll();
  const usersRepository = shared.db.usersRepository;
  await usersRepository.deleteAll();
}
