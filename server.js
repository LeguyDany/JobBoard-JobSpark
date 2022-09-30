// Connects to a server which is going to send requests through routes and listen to the requests.

const express = require('express');
const cors = require('cors');
const userRoutes = require("./api_rest/src/user/routes");
const companyRoutes = require("./api_rest/src/company/routes");
const app = express();
const port = 3001;

// Allows to post and get json from our end points.
app.use(express.json());
app.use(cors());
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", companyRoutes);

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.listen(port, () => console.log(`app listening on port ${port}`))