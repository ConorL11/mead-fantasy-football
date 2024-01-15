import mongoose from "mongoose";

const seasonsSchema = new mongoose.Schema({
    season: {type: Number, required: true, unique: true}, 
    teams: [{
        owners: [
            {type: String, unique: true}
        ],
        summary: {
            regularSeason: {
                losses: {type: Number},
                playoffSeed: {type: Number},
                points: {type: Number},
                pointsAgainst: {type: Number},
                // standardDeviation: {type: Number},
                wins: {type: Number},
            },
        }, 
        teamId: {type: Number, required: false, unique: false}, 
        teamName: {type: String, required: false},
        transactions: {
            adds: {type: Number},
            trades: {type: Number}
        },
    }],
    // matchups: [{
    //     id: {type: String, required: true},
    //     week: {type: Number, required: true},
    //     away: {
    //         teamId: {type: Number, required: true},
    //         points: {type: Number, required: true},
    //     },
    //     home: {
    //         teamId: {type: Number, required: true},
    //         points: {type: Number, required: true},
    //     }
    // }],
});

const Season = mongoose.model("Season", seasonsSchema );

export default Season;