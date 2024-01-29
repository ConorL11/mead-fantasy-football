import mongoose from "mongoose";

const seasonsSchema = new mongoose.Schema({
    results: {
        championUser: {type: String},
        losingUser: {type: String},
        platform: {type: String},
        runnerUpUser: {type: String},
    },
    schedule: [{
        id: {type: String, required: true},
        matchupPeriodId: {type: Number, required: true},
        away: {
            teamId: {type: Number, required: false},
            totalPoints: {type: Number, required: false},
        },
        home: {
            teamId: {type: Number, required: false},
            totalPoints: {type: Number, required: false},
        }
    }],
    season: {type: Number, required: true, unique: true}, 
    teams: [{
        owners: [
            {type: String, unique: true}
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