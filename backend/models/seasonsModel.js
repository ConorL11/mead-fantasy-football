import mongoose from "mongoose";

const seasonsSchema = new mongoose.Schema({
    results: {
        championUser: {type: String},
        losingUser: {type: String},
        platform: {type: String},
        runnerUpUser: {type: String},
    },
    schedule: [{
        id: {type: String, required: false},
        matchupPeriodId: {type: Number, required: false},
        matchupType: {type: String, required: false},
        away: {
            teamId: {type: Number, required: false},
            totalPoints: {type: Number, required: false},
        },
        home: {
            teamId: {type: Number, required: false},
            totalPoints: {type: Number, required: false},
        }
    }],
    season: {type: Number, required: false, unique: false}, 
    teams: [{
        owners: [
            {type: String, unique: false, required: false}
        ],
        summary: {
            regularSeason: {
                expectedWins: {type: Number},
                losses: {type: Number},
                playoffSeed: {type: Number},
                points: {type: Number},
                pointsAgainst: {type: Number},
                standardDeviation: {type: Number},
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
});

const Season = mongoose.model("Season", seasonsSchema );

export default Season;