const express = require("express");
const app = express();
const routes = require("./routes/v1");

const PORT = 3000;

// ToDo: use environment variables
// ToDo: use helmet and cors
// ToDo: use morgan or similar for logging
//

app.get("/", (req, res) => {
  res.send("Activity Bookings API");
});
app.use(express.json());
routes.configure(app);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
