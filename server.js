// Connects to a server which is going to send requests through routes and listen to the requests.
const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const userRoutes = require("./api_rest/src/user/routes");
const companyRoutes = require("./api_rest/src/company/routes");
const advertisementRoutes = require("./api_rest/src/advertisement/routes");
const informationRoutes = require("./api_rest/src/information/routes");
const authentificationRoutes = require("./api_rest/src/authentification/routes");

const app = express();
const port = 3001;

// Allows to post and get json from our end points.
// app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }))

// const helmet = require("helmet");
// app.use(helmet());
// app.use(helmet.crossOriginEmbedderPolicy({policy:"cross-origin"}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to JobSpark's API!");
})

app.listen(port, () => console.log(`app listening on port ${port}`));

app.use("/api/", userRoutes);
app.use("/api/", companyRoutes);
app.use("/api/", advertisementRoutes);
app.use("/api/", informationRoutes);
app.use("/auth/", authentificationRoutes);

app.post("/test", (req, res) => {
    res.send(req.files.image);
});

// app.post("/test2", (req, res) => {
//     // const { resume, profile_pic } = req.body
//     // console.log(resume);
//     // console.log(profile_pic);
//     res.send(req.files);
//     console.log(req.body);
// })