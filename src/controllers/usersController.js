const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
      const {name,email,phone,password} = req.body;
      const hashPass = await bcrypt.hash(password,10);
      const newUser = new User({name,email,phone,password:hashPass}); 
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const login = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user) return res.send("invalid email!");
    const hashPass = await bcrypt.compare(password,user.password);
    if(hashPass===true){
    const token = jwt.sign({userId:user._id.toString()}, "secret-key",{
         expiresIn:"3d"
    });
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token })};
  } catch (error) {
    res.status(404).json(error.message)
  }
};

const allUsers = async (req,res)=>{
    try {
        const data = req.query;
        const users = await User.find(data).select({name:1,_id:0});
        res.send(users)
    } catch (error) {
        console.log(error)
    }
};

const usingRegex = async(req,res)=>{
  try {
    const user = await User.find({name: {$regex: /p/i}});
    res.status(202).json(user)
  } catch (error) {
    res.status(404).json(error.message)
  }
};

module.exports = {signup,login,allUsers,usingRegex}