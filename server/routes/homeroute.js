const router = require("express").Router();

// controllers
const homecontroller = require("../controllers/homecontroller");

router.get("/", homecontroller.homepage);

module.exports = router;
