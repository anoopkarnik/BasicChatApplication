const express = require('express');
const {User} = require('../models/db');
const router = express.Router();
require('dotenv').config();


router.get('/',  async(req,res,next)=>{
    const name = req.query.filter || '';
    const users = await User.find({ name: { $regex: `^${name}`, $options: 'i' } });
    res.json({user: users.filter(user => user._id!=req.userId).map(user=>({username: user.username,
         name: user.name, _id: user._id, gender: user.gender, profilePic: user.profilePic}))});
})

module.exports = router; 