const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    inStock :{
        type : Boolean,
        default : true
    },
    ratings:{
        type : Number,
        required : true
    }
}, {timestramps:true});

module.exports = mongoose.model('product', productSchema);