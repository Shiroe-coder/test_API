const express = require("express");
const userRouter = express.Router();

const User =require("../model/User");
userRouter.post("/register",(req,res) =>{
    const {user,pass,role} = req.body;

    //kiem tra tai khoang co ton tai chua
    User.findOne({user},(err,user) =>{
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        if (user) res.status(400).json({
            message: {msgBody:"Ten Dang Nhap Da Ton Tai", msgError:false}
        })
        else {
            const newUser = new User(req.body);
            newUser.save((err,data)=>{
                if (err) res.status(500).json({
                    message: {msgBody:"Error",msgError:true}
                })
                else res.status(200).json({
                    message: {msgBody: "tao tai khoan thanh cong", msgError: false},data
                })
            })
        }
    })
})
userRouter.post("/login",(req,res)=>{
    const {user,pass} = req.body;
    User.findOne({user},(err,user) =>{
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        if (!user) res.status(400).json({
            message: {msgBody:"Ten Dang Nhap khong Ton Tai", msgError:false}
        })
        else {
            const data = {user};
            console.log(data.user.pass)
            if (pass != data.user.pass)res.status(400).json({
                message: {msgBody:"sai mat khau", msgError:false}
            })
            else res.status(200).json({data})
        }
    })
})

userRouter.get("/user",(req,res) =>{
    const {user} = req.headers;
    User.findOne({user},(err,user) =>{
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        else {
            res.status(200).json({data})
        }
    })
})





userRouter.get("/logout",(req,res) =>{
    res.clearCookie("xoa het bo nho");
    res.json({user:{user:"", pass:"",role:""},success:true})
})

module.exports = userRouter;