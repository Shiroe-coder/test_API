const mongoose = require("mongoose");

const OrderInfoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: 'Item',
    },
    quantity: Number,
});

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: 'userprofile',
    },
    address: String,
    phoneNumber: String,
});

const OrderSchema = new mongoose.Schema({
    customer: UserSchema,
    totalPrice: Number,
    info: [OrderInfoSchema],
});
module.exports = mongoose.model("Order",OrderSchema);
