const express = require("express");
const router = express.Router();


const generateOtp = require("../controller/controller");


router.post("/generate", generateOtp)


module.exports = router;


// const router = require('express').Router();
// const { signUp, verifyOtp } = require('../Controllers/userController');

// router.route('/signup')
//     .post(signUp);
// router.route('/signup/verify')
//     .post(verifyOtp);

// module.exports = router;