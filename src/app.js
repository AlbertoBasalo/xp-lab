const express = require("express");
var cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes/v1");
const { errorHandler, logger } = require("./shared");
const PORT = 3000;
const app = express();
app.use(cors());
app.use(helmet());

// ToDo: use environment variables

app.get("/", (req, res) => {
  res.send("Activity Bookings API");
});
app.use(express.json());
routes.configure(app);
app.use(errorHandler);
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}, ${process.env.NODE_ENV} environment `));
