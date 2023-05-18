const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
      const data = req.body;
      const user = new User(data);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const login = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email,password:password});
    if(!user) return res.send("invalid email or password!");
    const token = jwt.sign({userId:user._id.toString()}, "secret-key");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
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