const mongoose = require('mongoose');
const User = require('./usersModel');
const Product = require('./productModel');


const orderSchema = new mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        required : true,
        ref : User
    },
    productId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : Product
    },
    isDelete :{
        type : Boolean,
        default : false
    }
}, {timestramps:true});

module.exports = mongoose.model('order', orderSchema);