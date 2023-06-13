const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/save-data", controller.saveData);
router.get("/get-all-data", controller.getAllData);
router.get("/get-data/:key", controller.getData);

module.exports = router;
