const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

app.use(cors({ origin: "*" }));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${HOST}:${PORT}.`);
});

