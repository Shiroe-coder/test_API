const express = require("express");
const CartRouter = express.Router();

const Cart =require("../model/cart");

CartRouter.post("/create",(req,res) =>{
    const newCart = new Cart({ customer: req.body.customer,
    totalPrice: req.body.totalPrice,
    info: req.body.info,})
    newCart.save((err,data)=>{
        console.log(err)
        if (err) res.status(500).json({
            message: {msgBody:"Error",msgError:true},
        })
        else res.status(200).json({
            message: {msgBody: "tao cart thanh cong", msgError: false},
            data
        })
    })
})
CartRouter.delete('/delete', (req, res) => {
    var query = { _id: req.body._id  };
    Cart.findOneAndRemove(query, 
      (e, raw) => {
        if (e) {
          res.status(400).send('err');
        }
      res.send(raw);
    });
});

module.exports = CartRouter;