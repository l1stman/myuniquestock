const router = require("express").Router();

// controllers
const usercontroller = require("../../controllers/userscontroller");

router.post("/users/admin/signin", usercontroller.signIn);
router.post("/users/admin/checktoken", usercontroller.checkToken);
module.exports = router;
