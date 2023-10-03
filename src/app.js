const express = require("express");
const app = express();
const routes = require("./routes/v1");

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Activity Bookings API");
});
routes.configure(app);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
