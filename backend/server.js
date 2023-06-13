const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { connectToDb } = require("./db/conn");
const router = require("./api/routes");
const { initRedis } = require("./db/redis");

// --------- app use -------------
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//------connect to mongodb
connectToDb()
initRedis()

// ---------- connect to route ---------------
app.use("/api", router);

//-------------- run server ------------
app.get("/", (req, res) => {
	res.send("Backend Server!");
});

app.listen(process.env.PORT || port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
