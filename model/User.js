const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "Userprofile"
    },
    pass:{
        type:String,
        require: true,
        min:6,
    }
});



/*
UserSchema.pre("save",function(next){
    if(!this.isModified("pass")) return next();
    bcrypt.hash(this.pass,10,(err , passHash) =>{
        if(err) return next(err);
        this.pass = passHash;
        next();
    })
})

UserSchema.method.comparePassword = function (pass,cb) {
    bcrypt.compare(pass,this.pass,(err,isMatch) =>{
        if (err) return cb(err);
        else {
            if (!isMatch) return cb(null,isMatch);
            return cb(null,this);
        }
    })
}
*/
module.exports = mongoose.model("User",UserSchema);