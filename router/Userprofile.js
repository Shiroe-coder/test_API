const express = require("express");
const UserprofileRouter = express.Router();

const Userprofile =require("../model/Userprofile");

UserprofileRouter.post("/sign",(req,res) =>{
    const User = req.body.user;
    console.log(req.body.user)
    //kiem tra tai khoang co ton tai chua
    // Userprofile.findOne({User},(err,User) =>{
    //     if (err) res.status(500).json({
    //         message: {msgBody: "Error",msgError: true},
            
    //     })
    //     if (User) res.status(400).json({
    //         message: {msgBody:"Ten Dang Nhap Da Ton Tai", msgError:false}
    //     })
    //     else {
            const newUser = new Userprofile({user : req.body.user,
                                            pass : req.body.pass,
                                            fullName : req.body.fullName,
                                            phoneNumber : req.body.phoneNumber,
                                            image : req.body.image,
                                            country : req.body.country,
                                            city : req.body.city,
                                            address : req.body.address,
                                            email : req.body.email,
                                            role : req.body.role });
            newUser.save((err,data)=>{
                console.log(err)
                if (err) res.status(500).json({
                    message: {msgBody:"Error",msgError:true},
                    
                })
                else res.status(200).json({
                    message: {msgBody: "tao tai khoan thanh cong", msgError: false},
                    data
                })
            })
    //     }
    // });

})
UserprofileRouter.get("/Userprofile",(req,res,next) =>{
    Userprofile.find().then((user,err) =>{
        console.log(err)
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        else {
            res.status(200).json({user})
            res.send({user})
        }
    })
})

UserprofileRouter.get('/Userprofile', (req, res,next) => {
    var _id = req.params._id;
    console.log(_id)
    Userprofile.findOne({_id:_id}).then((user,err) => {
        console.log(err)
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        else {
            res.status(200).json({user})
            res.send(user);
        }
      
    });
  });

 
UserprofileRouter.put("/update",(req,res) =>{
        const newUser = new Userprofile({
            user: req.body.user,
            pass: req.body.pass,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            image: req.body.image,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            role: req.body.role,
        })
        console.log(newUser)
        var query = { _id: req.body._id };
        Userprofile.findOneAndUpdate(query,newUser,
            {new:true}, (err, user) =>{
                if(err){
                    console.log(err)
                    res.status(400).send('err');
                }
                res.send(user)
            })
})

UserprofileRouter.delete('/delete', (req, res) => {
    var query = { _id: req.body._id  };
    Userprofile.findOneAndRemove(query, 
      (e, raw) => {
        if (e) {
          res.status(400).send('err');
        }
      res.send(raw);
    });
  });

module.exports = UserprofileRouter;