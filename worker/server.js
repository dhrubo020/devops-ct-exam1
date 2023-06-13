const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { connectToDb } = require("./db/conn");
const { initRedis } = require("./db/redis");

// --------- app use -------------
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//------connect to mongodb
connectToDb()
initRedis()

//-------------- run server ------------
app.get("/", (req, res) => {
	res.send("Worker Server!");
});

app.listen(process.env.PORT || port, () => {
	console.log(`Worker Server Listening at http://localhost:${port}`);
});
