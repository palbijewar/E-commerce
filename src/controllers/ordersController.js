const Orders = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/usersModel');


const orders = async (req,res)=>{
    try {
        const data = await Orders.create(req.body);
        const populated = await data.populate('userId');
        const populateOrder = await populated.populate('productId');
        res.status(202).json({success : true, data : populateOrder });
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const allOrders = async (req,res)=>{
    try {
        const data = req.query;
        const orders = await Orders.find(data).populate('userId').populate('productId');
        res.status(302).json(orders)
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const findUser = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Orders.findById(orderId);
      const user = await User.findById(order.userId);
      res.status(202).json(user.name);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
  
const findProduct = async (req,res)=>{
    try {
        const orderId = await Orders.findById('64662c63f219fb69aaa2de7c');
    const product = await Product.find({_id:orderId.productId}).select({name:1, price:1,_id:0});
    res.status(202).json(product)
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = {orders,allOrders,findUser,findProduct}