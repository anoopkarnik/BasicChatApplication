const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/app";

try{
    mongoose.connect(MONGODB_URL)
    console.log("Connected to the database");
}
catch(e){
    console.log("Error connecting to the database");
    console.log(e);
}

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30},
    password: {type: String, required: true, minLength: 6},
    name: {type: String, required: true, trim: true, maxLength: 50},
    gender: {type: String, required: true, enum: ["male","female","other"]},
    profilePic: {type: String, default: ""}
},{timestamps: true});

const ConversationSchema = new mongoose.Schema({
    participants: {type: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], required: true},
    messages: {type: [{type:mongoose.Schema.Types.ObjectId,ref:'Message'}], default: []}
},{timestamps: true});

const MessageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, required: true,ref:"User"},
    receiverId: {type: mongoose.Schema.Types.ObjectId, required: true,ref:"User"},
    message: {type: String, required: true}
},{timestamps: true});

const User = mongoose.model('User', UserSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { User, Conversation, Message};