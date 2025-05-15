const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    desc:{
        type: String,
        required : true
    },
    quantity: {
        type: Number,
        required : true,
        min: 1,
    },
     price: {
        type: Number,
        required : true,
    },
     img: {
        type: String,
        required : true,
    },
    user:{
        type: String,
        required: true,
    }
}) 

module.exports = mongoose.model("CartItems", CartSchema);