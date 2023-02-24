const  otpModel = require('../models/OtpModel');
const jwt = require("jsonwebtoken");
var nodemail = require("../email")



const signUp = async function(req, res){
    const email = req.body.email;
    if(!email){
        return res.status(400).json({message:"Enter Email Id"});
    };

    const data = await otpModel.find({"email": email});

    // when resend otp within 5 min
    if(data[0]){
        const otpupdate = Math.floor(Math.random() * 1000000);
        await otpModel.findOneAndUpdate({"email":email},{"otp":otpupdate});

        await nodemail.sendEmail("pramodkumarjnvs@gmail.com","Login verification code","Your 6 digit OTP:- "+otpupdate+" , It is valid for next 5min ");

        return res.send({status : true , message :"OTP generated successfully and Valid for 5 min",data:otpupdate});

    }

    const otp = Math.floor(Math.random() * 1000000);

    await nodemail.sendEmail("pramodkumarjnvs@gmail.com","Hello Dear","Your 6 digit OTP:- "+otp+" , It is valid for next 5min ")

    const createData  = await otpModel.create({"email": email , "otp": otp});
    res.send({status : true , message :"OTP generated successfully and Valid for 5 min",data : createData})
    // console.log(createData);

}


const verifyOtp = async function(req, res){
    const userId = req.body.user_id;
    const email = req.body.email;
    const otp = req.body.otp;

    const userData  = await otpModel.find({"email":email});

    if(!userData[0]){
        res.send({status: false, message:"OTP expire , Please login again"})
    }

    if(userData[0].otpcount == 5){
        res.send({status : false, message : "OTP expire , limit cross "})
    }

    if(userData[0].otp === otp){

        const token = jwt.sign({
            _id: userId,
            email: email
        }, "sunil", { expiresIn: "1d" });
        res.header('authkey', token);
        res.status(201).send({ status: true, message: "User login successfully", data: { token } })

        await otpModel.findOneAndUpdate({"email":email},{"otp":null})

    }else{
        var count  = userData[0].otpcount;
        count += 1;
        await otpModel.findOneAndUpdate({"email" : email},{"otpcount": count});
        return res.status(404).send({status: false, message:"Enter valid OTP"})
    };

}



module.exports = {signUp, verifyOtp}