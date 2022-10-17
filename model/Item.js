const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
    name_item: {
        type: String,
        unique: true,
    },
    note_item: {
        type: String,
    },
    image_item: {
        type: [String],
    },
    price: {
        type: Number
    },
    amout_item: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("Item",ItemSchema);
