
// Questions to ask about the users data model

// 1 - can any user have multiple ESPN IDs or multiple Sleeper IDs? 
// How do I handle a change in an active sleeper ID or active ESPN ID in my data pipeline?

// 

const users = [
    {
        user_id: 'string', 
        user_name: 'string', 
        user_nickname: 'string',
        active_espn_id: 'string', 
        active_sleeper_id: 'string',
        historical_averages: {
            points: 'float',
            stdDev: 'float', 
            pickups: 'float',
            trades: 'float',
            wins: 'float', 
            luck: 'float',
            pointsAgainst: 'float',
        }, 
        season_summaries: [
            {
                season: 'int',
                points: 'float',
                average_points,
                stdDev: 'float', 
                pickups: 'float',
                trades: 'float',
                wins: 'float', 
                luck: 'float',
                pointsAgainst: 'float'
            },
        ],
        outlier_weeks: {
            maxPoints: {
                points,        
                season,
                week
            },
            minPoints: {
                points,
                season,
                week
            },
            maxPointsAgainst: {
                points,
                season,
                week
            },            
            minPointsAgainst: {
                points,
                season,
                week
            },     
            blowoutWin: {
                pointsFor: 'float',
                pointsAgainst: 'float',
                opponent: 'string', // opponents ESPN or Sleeper ID from the season in question
                season: 'string',
                week: 'int'
            },
            blowoutLoss: {
                pointsFor: 'float',
                pointsAgainst: 'float',
                opponent: 'string', // opponents ESPN or Sleeper ID from the season in question
                season: 'string',
                week: 'int'
            }, 
            closeWin: {
                pointsFor: 'float',
                pointsAgainst: 'float',
                opponent: 'string', // opponents ESPN or Sleeper ID from the season in question
                season: 'string',
                week: 'int'
            },  
            closeLoss: {
                pointsFor: 'float',
                pointsAgainst: 'float',
                opponent: 'string', // opponents ESPN or Sleeper ID from the season in question
                season: 'string',
                week: 'int'
            }, 
        }, 
    },
];

const matchups = [
    {
        season,
        leagueId,
        matchups: {
            // copy sleeper matchups format here
        }

    }
]


const transactions = [
    {
        season,
        transactions: {
            // copy sleeper matchups format here
        }
    }
]