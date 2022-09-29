// Connects to a server which is going to send requests through routes and listen to the requests.

const express = require('express');
const userRoutes = require("./api_rest/src/user/routes");
const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

// Allows to post and get json from our end points.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.listen(port, () => console.log(`app listening on port ${port}`))

app.use("/api/v1/user", userRoutes);