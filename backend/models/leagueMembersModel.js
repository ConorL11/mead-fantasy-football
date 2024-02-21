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
    espn_ids: [
        {
            type: String,
            required: false, 
            unique: false
        }
    ], 
    sleeper_ids: [
        {
            type: String,
            required: false
        }
    ], 
    colors: [
        {
            type: String,
            required: false
        }
    ], 
    active: {type: Boolean}
});

const LeagueMember = mongoose.model("LeagueMember", LeagueMemberSchema );

export default LeagueMember;