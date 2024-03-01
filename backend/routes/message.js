const express = require('express');
const {Conversation, Message} = require('../models/db');
const router = express.Router();
require('dotenv').config();


router.post('/send/:id', async(req,res)=>{
    try{
        const {id: receiverId} = req.params;
        const {message} = req.body;
        const senderId = req.userId
        let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}});
        if (!conversation){
            Conversation.create({participants: [senderId, receiverId]});
        }
        const newMessage = await Message.create({senderId,receiverId, message});
        if (newMessage){
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
        res.json({newMessage});

    }
    catch(e){
        res.status(500).json({error: 'Error in Send message route'});
    }
})

router.get('/get/:id', async(req,res)=>{
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.userId;
        let conversation = await Conversation.findOne({participants: {$all: [senderId, userToChatId]}}).populate('messages');
        if (!conversation){
            return res.json([]);
        }
        res.json(conversation.messages)
    }
    catch(e){
        res.status(500).json({error: 'Error in Get message route'});
    }
})
module.exports = router; 