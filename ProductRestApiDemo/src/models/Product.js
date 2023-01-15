const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    admin_id:{
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;