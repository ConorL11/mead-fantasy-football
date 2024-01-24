
import axios from "axios";
import { readFile } from 'fs/promises';
import fs from 'fs'

// constants for league access
const leagueId2021 = '730899355048996864';
const leagueId2023 = '990427440436625408';
const espnLeagueId = '322485';


// Constant for Past Season Results
const seasonResults = [
    {season: 2023, platform: 'sleeper', championUser: "658e44679c85c8b96b5f5177", runnerUpUser:  "658e44679c85c8b96b5f5173", losingUser: "658e44679c85c8b96b5f5178"},
    {season: 2022, platform: 'espn', championUser: "658e44679c85c8b96b5f517b", runnerUpUser: "658e44679c85c8b96b5f5173", losingUser: "658e44679c85c8b96b5f5179"},
    {season: 2021, platform: 'sleeper', championUser: "658e44679c85c8b96b5f5174", runnerUpUser: "658e44679c85c8b96b5f5178", losingUser: "658e44679c85c8b96b5f5173"},
    {season: 2020, platform: 'espn', championUser: "658e44679c85c8b96b5f5175", runnerUpUser: "658e44679c85c8b96b5f5174", losingUser: "658e44679c85c8b96b5f5179" },
    {season: 2019, platform: 'espn', championUser: "658e44679c85c8b96b5f5175", runnerUpUser: "658e44679c85c8b96b5f5177", losingUser: "658e44679c85c8b96b5f5179"},
    {season: 2018, platform: 'espn', championUser: "658e44679c85c8b96b5f5178", runnerUpUser: "658e44679c85c8b96b5f5179", losingUser: "658e44679c85c8b96b5f5176"},
    {season: 2017, platform: 'espn', championUser: "658e44679c85c8b96b5f5174", runnerUpUser: "658e44679c85c8b96b5f5176", losingUser: "658e44679c85c8b96b5f517a"},
    {season: 2016, platform: 'espn', championUser: "658e44679c85c8b96b5f5172", runnerUpUser: "658e44679c85c8b96b5f5178", losingUser: "658e44679c85c8b96b5f517c"},
    {season: 2015, platform: 'espn', championUser: "658e44679c85c8b96b5f5179", runnerUpUser: "658e44679c85c8b96b5f5175", losingUser: "658e44679c85c8b96b5f517a"},
    {season: 2014, platform: 'espn', championUser: "658e44679c85c8b96b5f5176", runnerUpUser: "658e44679c85c8b96b5f5175", losingUser: "658e44679c85c8b96b5f517d"},
];

// const seasonResultsReadable = [
//     {year: '2023', platform: 'sleeper', winningUser: 'Boobsink', winningTeam: 'Americas Fantasy Team', losingUser: '???', losingTeam: '????', punishment: 'Likely no punishment or eggs'},
//     {year: '2022', platform: 'espn', winningUser: 'Fisher', winningTeam: 'Big Bussin Bouncy Balls', losingUser: 'Cody', losingTeam: 'Just Last', punishment: 'Wore Griffs HS Football Jersey to the draft (kinda).'},
//     {year: '2021', platform: 'sleeper', winningUser: 'Rob', winningTeam: 'Unlucky Bastards', losingUser: 'Griff', losingTeam: 'Balerian the Dreadful', punishment: 'Got pelted with eggs'},
//     {year: '2020', platform: 'espn', winningUser: 'Desch', winningTeam: 'Pop Drop and Lockett', losingUser: 'Cody', losingTeam: 'I quit', punishment: 'Made an Only Fans (kinda)'},
//     {year: '2019', platform: 'espn', winningUser: 'Desch', winningTeam: "Philip Rivers' 10th Kid", losingUser: 'Ryan', losingTeam: 'Back to retirement', punishment: 'Wore a tutu to the draft (kinda)'},
//     {year: '2018', platform: 'espn', winningUser: 'Patty', winningTeam: 'The Boobskin', losingUser: 'Fisher', losingTeam: 'Mia Malkova', punishment: 'Had to get frosted tips (but looked good)'},
//     {year: '2017', platform: 'espn', winningUser: 'Rob', winningTeam: 'The ToddFather Part 2',  losingUser: 'Thomas', losingTeam: 'Well Darn', punishment: 'Wore a dildo to the FoCo bars'}, 
//     {year: '2016', platform: 'espn', winningUser: 'Conor', winningTeam: 'Curb Check', losingUser: 'John Brady', losingTeam: 'At Least Im Not at Wyoming', punishment: 'Did not follow through on head shaving'},
//     {year: '2015', platform: 'espn', winningUser: 'Cody', winningTeam: 'LOL Hiroshima',  losingUser: 'Thomas', losingTeam: 'Comeback Time Bitches', punishment: ' Did Standup Comedy'},
//     {year: '2014', platform: 'espn', winningUser: 'Ryan', winningTeam: 'The Rylo Show', losingUser: 'Perez', losingTeam: 'FUCK MARSHAWN LYNCH', punishment: 'Got Kicked out of the league'},
// ];

// initialize variable to host all processed data

let seasons = [];

// Pull all JSON Data
try {

    console.log('Extracting Data... ')
    // Pull Data from MongoDB for league Members
    const {data: members} = await axios.get('http://localhost:4000/api/leagueMembers');

    // Pull data from ESPN leagues where the privacy blocks me from grabbing it directly
    // When running this from the root directory, use these
    const rawData2014 = JSON.parse(fs.readFileSync('./backend/data/leagueData2014.json'))[0];
    const rawData2015 = JSON.parse(fs.readFileSync('./backend/data/leagueData2015.json'))[0];
    const rawData2016 = JSON.parse(fs.readFileSync('./backend/data/leagueData2016.json'))[0];
    const rawData2017 = JSON.parse(fs.readFileSync('./backend/data/leagueData2017.json'))[0];
    const rawData2018 = JSON.parse(fs.readFileSync('./backend/data/leagueData2018.json'));
    const rawData2019 = JSON.parse(fs.readFileSync('./backend/data/leagueData2019.json'));


    // When running script from the backend directory, uses these
    // const rawData2014 = JSON.parse(fs.readFileSync('./data/leagueData2014.json'))[0];
    // const rawData2015 = JSON.parse(fs.readFileSync('./data/leagueData2015.json'))[0];
    // const rawData2016 = JSON.parse(fs.readFileSync('./data/leagueData2016.json'))[0];
    // const rawData2017 = JSON.parse(fs.readFileSync('./data/leagueData2017.json'))[0];
    // const rawData2018 = JSON.parse(fs.readFileSync('./data/leagueData2018.json'));
    // const rawData2019 = JSON.parse(fs.readFileSync('./data/leagueData2019.json'));

    // Pull data from public ESPN leagues
    const {data: rawData2020} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/${322485}?view=mTeam&view=mBoxscore&view=mSettings`);
    const {data: rawData2022} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/${322485}?view=mTeam&view=mBoxscore&view=mSettings`);

    // Pull data from Sleeper Leagues
    const rawData2021 = await fetchSleeperData(leagueId2021);
    const rawData2023 = await fetchSleeperData(leagueId2023);


    // Begin Transforming Data
    console.log('Transforming Data...')

    // Put together object of ESPN seasons to loop over and process
    let rawEspnSeasons = [
        {season: 2014, rawData: rawData2014},
        {season: 2015, rawData: rawData2015},
        {season: 2016, rawData: rawData2016},
        {season: 2017, rawData: rawData2017},
        {season: 2018, rawData: rawData2018},
        {season: 2019, rawData: rawData2019},
        {season: 2020, rawData: rawData2020},
        {season: 2022, rawData: rawData2022},
    ];

    // Put together object of Sleeper seasons to loop over and process
    let rawSleeperSeasons = [
        {season: 2021, rawData: rawData2021},
        {season: 2023, rawData: rawData2023}
    ];

    // Process ESPN Data
    for(const season of rawEspnSeasons){
        let processedData = processEspnData(season.rawData);
        seasons.push(processedData);
    }

    // Process Sleeper Data
    for(const season of rawSleeperSeasons){
        let processedData = processSleeperData(season.rawData);
        seasons.push(processedData);
    }

    // sort final array based on year
    seasons.sort((a,b) => a.season - b.season);

    // CONOR Working Here
    // add hardcoded playoff results to the object
    for(const season of seasons){
        for(const seasonResult of seasonResults){
            if(seasonResult.season == season.season){
                season.results = {...seasonResult}
                delete season.results.season;
            }
        }
    }

    console.log('Data transform completed!')
    debugger

} catch (error) {
    console.log(error);
}

// Extraction Functions

// Sleeper Fetching Functions
async function fetchSleeperData(leagueId){
    const {data: league} = await axios.get("https://api.sleeper.app/v1/league/"+leagueId);
    const {data: users} = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/users");
    const {data: rosters} = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/rosters");
    const transactions = await fetchSleeperTransactions(leagueId);
    const matchups = await fetchSleeperMatchups(leagueId);
    return {season: Number(league.season), league, users, rosters, transactions, matchups};
}

// Function to fetch Sleeper Transactions for completed seasons 
async function fetchSleeperTransactions(leagueId) {
    let allTransactions = [];
    const countGames =  17 // might need to change this based on season length
    for(let i=1; i <= countGames; i++){
        try {
            let responseTransactions = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/transactions/"+i);
            allTransactions.push(responseTransactions.data);
        } catch (error) {
            console.log(error);
        }
    }
    return allTransactions;
}

async function fetchSleeperMatchups(leagueId) {
    let allMatchups = [];
    const countGames = 17 // might need to change this based on season length
    for(let i=1; i <= countGames; i++){
        try {
            let responseMatchups = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/matchups/"+i);
            allMatchups.push(responseMatchups.data);
        } catch (error) {
            console.log(error);
        }
    }
    return allMatchups;
}


// Transform Functions
function processEspnData(seasonData){

    // form teamIdMap
    let teamIdMap = {};
    for(const team of seasonData.teams){
        team.schedule = [];
        teamIdMap[team.id] = team;
    }

    // Assign all matchups to a team
    for(const game of seasonData.schedule){
        // Only tracking Regular Season Matchups
        if(game.matchupPeriodId <= seasonData.settings.scheduleSettings.matchupPeriodCount){
            teamIdMap[game.away.teamId].schedule.push(game);
            teamIdMap[game.home.teamId].schedule.push(game);        
        }
    }

    // populate teams array
    let teams = []; 
    for(const team of seasonData.teams) {

        // calcluate standard deviation
        let varSum = 0;
        for(const week of team.schedule){
            let points = week.away.teamId === team.id ? week.away.totalPoints : week.home.totalPoints;
            varSum += Math.pow((points - (team.record.overall.pointsFor / seasonData.settings.scheduleSettings.matchupPeriodCount)),2);
        }
        team.record.standardDeviation = Math.pow((varSum / seasonData.settings.scheduleSettings.matchupPeriodCount),0.5);

        let tempTeam = {
            teamId: team.id,
            teamName: team.name,
            owners: team.owners,
            transactions: {
                adds: team.transactionCounter.acquisitions,
                trades: team.transactionCounter.trades
            },
            summary: {
                regularSeason: {
                    wins: team.record.overall.wins,
                    losses: team.record.overall.losses,
                    percentage: team.record.overall.percentage,
                    playoffSeed: team.playoffSeed,
                    points: team.record.overall.pointsFor,
                    pointsAgainst: team.record.overall.pointsAgainst,
                    standardDeviation: team.record.standardDeviation
                },
            },
        }
        teams.push(tempTeam);
    }
    return {season: seasonData.seasonId, teams, schedule: seasonData.schedule};
}

function processSleeperData(seasonData){
    // Initialize Teams Array
    let teams = [];

    // Create Roster Maps
    let rosterIdMap = {};
    let ownerIdMap = {};
    // Sort rosters to get playoff seeds
    seasonData.rosters.sort((a,b) => b.settings.wins - a.settings.wins || ((b.settings.fpts + b.settings.fpts_decimal / 100) - (a.settings.fpts + a.settings.fpts_decimal / 100)));
    for(const [index, roster] of seasonData.rosters.entries()){
        roster.settings.playoffSeed = index+1;
        rosterIdMap[roster.roster_id] = roster;
        rosterIdMap[roster.roster_id].weeklyPointsFor = [];
        rosterIdMap[roster.roster_id].weeklyPointsAgainst = [];
        rosterIdMap[roster.roster_id].weeklyExectedWins = [];
        rosterIdMap[roster.roster_id].schedule = [];
        rosterIdMap[roster.roster_id].trades = 0;
        rosterIdMap[roster.roster_id].adds = 0;
        ownerIdMap[roster.owner_id] = roster;
    }

    // Get transactions and assign them to roster Id Map
    for(const week of seasonData.transactions){
        for(const transaction of week){
            if(transaction.status === 'complete'){
                for(const rosterId of transaction.roster_ids){
                    transaction.type === 'trade' ? rosterIdMap[rosterId].trades ++  : rosterIdMap[rosterId].adds ++;
                }
            }
        }
    }

    //Transform Matchup Data Structure to match ESPN Matchup Structure
    let schedule = [];
    let usedMatchups = [];
    let weekCounter = 1;
    let matchupCounter = 1;
    for(const week of seasonData.matchups){
        for(const [index, user] of week.entries()){
            let opponent = week.find((o) => o.matchup_id === user.matchup_id && o.roster_id !== user.roster_id);
            if(usedMatchups.indexOf('week-'+weekCounter+'-matchup-'+user.matchup_id) === -1){
                usedMatchups.push('week-'+weekCounter+'-matchup-'+user.matchup_id);

                let matchObj = {
                    home: {
                        pointsByScoringPeriod: {[weekCounter]: user.points},
                        teamId: user.roster_id,
                        tiebreak: 0,
                        totalPoints: user.points
                    },
                    id: matchupCounter,
                    matchupPeriodId: weekCounter
                };
                if(opponent){
                    matchObj.away = {
                        pointsByScoringPeriod: {[weekCounter]: opponent.points},
                        teamId: opponent.roster_id,
                        tiebreak: 0,
                        totalPoints: opponent.points
                    }
                }

                schedule.push(matchObj);
                matchupCounter++;
            }
        }
        weekCounter++;
    }

    // Assign all matchups to teams
    for(const game of schedule){
        // Only tracking Regular Season Matchups
        if(game.matchupPeriodId < seasonData.league.settings.playoff_week_start){
            rosterIdMap[game.away.teamId].schedule.push(game);
            rosterIdMap[game.home.teamId].schedule.push(game);
        }
    }

    // Populate array with data
    for(const user of seasonData.users){
        const roster = ownerIdMap[user.user_id];
        if(roster){
            
            // calcluate standard deviation
            let totalPoints = roster.settings.fpts + roster.settings.fpts_decimal / 100;
            let AveragePoints = totalPoints / (seasonData.league.settings.playoff_week_start - 1);
            let varSum = 0;
            for(const week of roster.schedule){
                let points = week.away.userId === user.id ? week.away.totalPoints : week.home.totalPoints;
                varSum += Math.pow(points - AveragePoints,2);
            }
            roster.settings.standardDeviation = Math.pow((varSum / (seasonData.league.settings.playoff_week_start - 1)),0.5);

            // Populate Teams Array
            teams.push({
                teamId: roster.roster_id,
                teamName: user.metadata.team_name,
                owners: [roster.owner_id],
                transactions : {
                    adds: roster.adds,
                    trades: roster.trades
                }, 
                summary: {
                    regularSeason: {
                        wins: roster.settings.wins,
                        losses: roster.settings.losses,
                        percentage: roster.settings.wins / (roster.settings.wins + roster.settings.losses),
                        playoffSeed: roster.settings.playoffSeed,
                        points: roster.settings.fpts + roster.settings.fpts_decimal / 100,
                        pointsAgainst: roster.settings.fpts_against + roster.settings.fpts_against_decimal / 100,
                        standardDeviation: roster.settings.standardDeviation
                    },
                },
            });
        }
    }

    teams.sort((a,b) => a.team_id - b.team_id);

    return {season: seasonData.season, teams, schedule}
}


export default seasons



// Conors Debugging and workflow notes
// Old ESPN Leagues URL: https://fantasy.espn.com/football/league/history?leagueId=322485&seasonId=2023
// ESPN API v2 - works for seasons 2017 and earlier
// https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/322485?seasonId=2017&view=mTeam

// ESPN API v3 - works for seasons 2018 on
// https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/322485?view=mTeam

// Completed Steps
// 1 - Pull League Data for each season
// 2 - Pull leagueMembers from Mongo
// 3 - Pull League History JSON Object from Data / Consants
// Modify ESPN Calls so I can get matchup data included. Re-import new JSON files with Matchup Data included
// Fully Build out Desired Data Structure for DB
// Transform ESPN Data - transactions
// Transform Sleeper Data - transactions
// Transform ESPN Data - League Summaries
// Transform Sleeper Data - League Summaries
// Run an insert with the transactions array of objects
// Add Standard Deviation to ESPN Data
// Transform Matchup Data for Sleeper to align with ESPN Style
// Add Standard Deviation to Sleeper Data
// Add Matchups to data