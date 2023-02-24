const express = require("express");
const router = express.Router();


const data = require("../controller/userController");


router.post("/generate", data.signUp);
router.post("/verify", data.verifyOtp);


module.exports = router;


