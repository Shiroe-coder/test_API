const mongoose = require("mongoose");

const UserprofilSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        min: 6,
    },
    pass:{
        type:String,
        require: true,
        min:6,
    },
    fullName: String,
    phoneNumber: String,
    image: String,
    country: String,
    city: String,
    address: String,
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: "customer",
    },
    createdAt: {
        type: Number,
        default: () => Date.now(),
    },
});
module.exports = mongoose.model("Userprofile", UserprofilSchema);
