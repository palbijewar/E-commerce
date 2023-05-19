const Order = require('../models/orderModel');
const User = require('../models/usersModel');
const Product = require('../models/productModel');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const mid1 = async (req,res,next)=>{
    try {
       const date = new Date();
       const today = moment().format('YYYY-MMM-DD HH-mm-ss')
       const ipAddress = req.ip;
       const route = req.route.path;
       const information = {
        time : today,
        IPAddress : ipAddress,
        route:route
       };
       console.log(information)
       res.send(information);
       next();
    } catch (error) {
        console.log(error)
    }
};

const auth1 = async (req,res,next)=>{
    try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.send("invalid token!!");
    const decoding = jwt.verify(token, "secret-key");
    const theUser = await User.findById(decoding._id);
    req.user = theUser;
    next()
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = {mid1,auth1}