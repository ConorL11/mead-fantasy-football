import mongoose from "mongoose";

const LeagueMemberSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true, 
        unique: true
    }, 
    user_name: {
        type: String,
        required: true
    }, 
    user_nickname: {
        type: String,
        required: false
    }, 
    espn_id: {
        type: String,
        required: true, 
        unique: true
    }, 
    sleeper_id: {
        type: String,
        required: true, 
        unique: true
    }
});

const LeagueMember = mongoose.model("LeagueMember", LeagueMemberSchema );

export default LeagueMember;