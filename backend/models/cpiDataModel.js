import mongoose from "mongoose";

const cpiDataSchema = new mongoose.Schema({
    week: {
        type: Number,
        required: true, 
        unique: true
    }, 
    data: [
        {
            user_id: {type: String, required: true, unique: true},
            settings: {
                wins: {type: Number, required: true},
                waiver_position: {type: Number, required: true},
                waiver_budget_used: {type: Number, required: true},
                total_moves: {type: Number, required: true},
                ties: {type: Number, required: true},
                ppts_decimal: {type: Number, required: true},
                ppts: {type: Number, required: true},
                losses: {type: Number, required: true},
                fpts_decimal: {type: Number, required: true},
                fpts_against_decimal: {type: Number, required: true},
                fpts_against: {type: Number, required: true},
                fpts: {type: Number, required: true},
                division: {type: Number, required: true},
                winning_pct: {type: Number},
                cpiRating: {type: Number, required: true},
            }, 
            metadata: {
                mention_pn: {type: String, required: true},
                allow_pn: {type: String, required: true},
            }, 
            league_id: {type: String, required: true},
            is_owner: {type: Boolean},
            is_bot: {type: Boolean, required: true},
            display_name: {type: String, required: true},
            avatar: {type: String, required: false},
            avatar_link: {type: String, required: false},
        }
    ]
});

const cpiDataModel = mongoose.model("cpiData", cpiDataSchema );

export default cpiDataModel;