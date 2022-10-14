const express = require("express");
const UserprofileRouter = express.Router();

const Userprofile =require("../model/Userprofile");

UserprofileRouter.post("/sign",(req,res) =>{
    const {user,pass,fullName, phoneNumber, image, country,city,address,email,role } = req.body;

    //kiem tra tai khoang co ton tai chua
    Userprofile.findOne({user},(err,user) =>{
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        if (user) res.status(400).json({
            message: {msgBody:"Ten Dang Nhap Da Ton Tai", msgError:false}
        })
        else {
            const newUser = new Userprofile({user,pass,fullName, phoneNumber, image, country,city,address,email,role });
            newUser.save((err,data)=>{
                if (err) res.status(500).json({
                    message: {msgBody:"Error",msgError:true}
                })
                else res.status(200).json({
                    message: {msgBody: "tao tai khoan thanh cong", msgError: false},
                    data
                })
            })
        }
    });

})
UserprofileRouter.get("/Userprofile",(req,res) =>{
    const {user} = req.body;
    Userprofile.findOne({user},(err,user) =>{
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        else {
            res.status(200).json({data})
        }
    })
})
UserprofileRouter.put("/update",(req,res) =>{
    const {user,pass,fullName, phoneNumber, image, country,city,address,email,role } = req.body;
    Userprofile.findOneAndUpdate({user:user},{user,pass,fullName, phoneNumber, image, country,city,address,email,role },{new:true})
})

module.exports = UserprofileRouter;