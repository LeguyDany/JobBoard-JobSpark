// Connects to a server which is going to send requests through routes and listen to the requests.

const express = require('express');
const cors = require('cors');
const userRoutes = require("./api_rest/src/user/routes");
const companyRoutes = require("./api_rest/src/company/routes");
const advertisementRoutes = require("./api_rest/src/advertisement/routes");
const informationRoutes = require("./api_rest/src/information/routes");
const authentificationRoutes = require("./api_rest/src/authentification/routes");
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

// Allows to post and get json from our end points.
app.use(express.json());
app.use(cors());
app.use("/api/", userRoutes);
app.use("/api/", companyRoutes);
app.use("/api/", advertisementRoutes);
app.use("/api/", informationRoutes);
app.use("/auth/", authentificationRoutes);

app.get("/", (req, res) => {
    res.send("TEST");
})

app.listen(port, () => console.log(`app listening on port ${port}`))