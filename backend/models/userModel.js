import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    }, 
    user_name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    team_name: {
        type: String,
        required: false
    }, 
    avatar: {
        type: String,
        required: false
    }, 
    avatar_link: {
        type: String,
        required: false
    }, 
});