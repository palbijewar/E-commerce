const Product = require('../models/productModel');

const products = async (req,res)=>{
    try {
    const data = req.body;
    const product = new Product(data);
    const savedProduct = await product.save();
    res.status(202).json(savedProduct)
    } catch (error) {
    res.status(400).json({error:error.message})
    }
};

const allProducts = async (req,res)=>{
    try {
        const data = req.query;
        const products = await Product.find(data).select({name:1,price:1,_id:0});
        res.send(products)
    } catch (error) {
        console.log(error)
    }
};

const fetchProduct = async (req,res)=>{
    try {
        const products = await Product.find(
            {$or:[
            {price:{$gte:10000}},
            {ratings:{$gte:4}}
        ]});
        res.send(products);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const fetching = async (req,res)=>{
    try {
        const product = await Product.findById("64662ab95edce85880d4b179");
        const updation = await Product.findOneAndUpdate({_id:product}, {inStock:false}, {new:true});
        res.status(202).json(updation);
    } catch (error) {
        res.status(404).json(error.message);
    }
};



const inBetween = async (req,res)=>{
    try {
        const product = await Product.find({category: {$nin: ['book','accessories']}})
        res.status(202).json(product);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const usingReg = async(req,res)=>{
    try {
      const user = await Product.find({category: {$regex: /acce/i}});
      res.status(202).json(user)
    } catch (error) {
      res.status(404).json(error.message)
    }
  };

const randomProduct = async (req,res)=>{
    try {
        const data = req.query;
        const product = await Product.find(data);
        res.status(202).json(product);
    } catch (error) {
        res.status(404).json(error.message);
    }
};



module.exports = {products,allProducts,fetchProduct,fetching,inBetween,usingReg,randomProduct}