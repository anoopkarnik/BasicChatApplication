const express = require('express');
const {User} = require('../models/db');
const router = express.Router();
const {signInBody, signUpBody, updateBody} = require('../validations/validations');
const {hashPassword,passwordCheck} = require('../utils/hash');
const jwt = require('jsonwebtoken');
const {generateTokenAndSetCookie } = require('../utils/token');

router.post('/signup', async(req,res,next)=>{
    const {success} = signUpBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({error: 'Invalid data'})
    }
    let {username, name, password,confirmPassword,gender} = req.body;
    if (password !== confirmPassword){
        return res.status(411).json({error: 'Passwords do not match'})
    }
    const existingUser = await User.findOne({username:username});
    if (existingUser){
        return res.status(409).json({error: 'User already exists'})
    }
    password = await hashPassword(password);
    let profilePic = gender === 'male' ?`https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = await User.create({username, name, password,gender, profilePic });
    const token = await generateTokenAndSetCookie(res, user._id);
    res.json({message: 'User created successfully',token,_id:user._id, username: user.username,
    name: user.name, profilePic: user.profilePic});
})

router.post('/signin', async(req,res,next)=>{
    const {success} = signInBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({error: 'Invalid data'})
    }
    const {username, password} = req.body;
    const user = await User.findOne({username:username});
    if (!user){
        return res.status(404).json({error: 'User not found'})
    }
    const isPasswordCorrect = await passwordCheck(password, user.password);
    if (!isPasswordCorrect){
        return res.status(401).json({error: 'Invalid username | password'})
    }
    const token = await generateTokenAndSetCookie(res, user._id);
    res.json({message: 'User signed in successfully', token,_id:user._id, username: user.username,
     name: user.name, profilePic: user.profilePic});
})

router.get('/logout',  async(req,res,next)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.json({message: 'User logged out successfully'});
    }
    catch(e){
        res.status(500).json({error: 'Logout Error Occurred'});
    }
    
})

router.put('/update', async(req,res,next)=>{
    const {success} = updateBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({error: 'Invalid data'})
    }
    let {name, password} = req.body;
    password = await hashPassword(password);
    await User.updateOne({_id: req.userId}, {name, password});
    res.json({message: 'User updated successfully'});
})



module.exports = router; 