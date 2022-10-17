const express = require("express");
const ItemRouter = express.Router();

const Item =require("../model/Item");

ItemRouter.post("/create",(req,res) =>{
    const newItem = new Item({ name_item: req.body.name_item,
    note_item: req.body.note_item,
    image_item: req.body.image_item,
    price: req.body.price,
    amout_item: req.body.amout_item})
    newItem.save((err,data)=>{
        console.log(err)
        if (err) res.status(500).json({
            message: {msgBody:"Error",msgError:true},
        })
        else res.status(200).json({
            message: {msgBody: "tao item thanh cong", msgError: false},
            data
        })
    })
})

ItemRouter.get("/get",(req,res,next) => {
    Item.find().then((item,err) =>{
        console.log(err)
        if (err) res.status(500).json({
            message: {msgBody: "Error",msgError: true}
        })
        else {
        res.status(200).json({item})
        res.send(item);
        }
    })
}) 

ItemRouter.put("/update",(req,res) =>{
    const newItem = new Item({ name_item: req.body.name_item,
        note_item: req.body.note_item,
        image_item: req.body.image_item,
        price: req.body.price,
        amout_item: req.body.amout_item})
    console.log(newItem)
    var query = { _id: req.body._id };
    Item.findOneAndUpdate(query,newItem,
        {new:true}, (err, item) =>{
            if(err){
                console.log(err)
                res.status(400).send('err');
            }
            res.send(item)
        })
}) 

ItemRouter.delete('/delete', (req, res) => {
    var query = { _id: req.body._id };
    Item.findOneAndRemove(query, 
      (e, raw) => {
        console.log(raw)
        if (e) {
          res.status(400).send('err');
        }
      res.send(raw);
    });
  });


module.exports = ItemRouter;