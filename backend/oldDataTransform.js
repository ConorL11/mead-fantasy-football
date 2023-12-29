
import axios from "axios";
import { readFile } from 'fs/promises';
import fs from 'fs'

// constants for league access
const leagueId2021 = '730899355048996864';
const espnLeagueId = '322485';

const pastSeasons = [
    {year: '2022', platform: 'espn', winningUser: 'Fisher', winningTeam: 'Big Bussin Bouncy Balls', losingUser: 'Cody', losingTeam: 'Just Last', punishment: 'Wore Griffs HS Football Jersey to the draft (kinda).'},
    {year: '2021', platform: 'sleeper', winningUser: 'Rob', winningTeam: 'Unlucky Bastards', losingUser: 'Griff', losingTeam: 'Balerian the Dreadful', punishment: 'Got pelted with eggs'},
    {year: '2020', platform: 'espn', winningUser: 'Desch', winningTeam: 'Pop Drop and Lockett', losingUser: 'Cody', losingTeam: 'I quit', punishment: 'Made an Only Fans (kinda)'},
    {year: '2019', platform: 'espn', winningUser: 'Desch', winningTeam: "Philip Rivers' 10th Kid", losingUser: 'Ryan', losingTeam: 'Back to retirement', punishment: 'Wore a tutu to the draft (kinda)'},
    {year: '2018', platform: 'espn', winningUser: 'Patty', winningTeam: 'The Boobskin', losingUser: 'Fisher', losingTeam: 'Mia Malkova', punishment: 'Had to get frosted tips (but looked good)'},
    {year: '2017', platform: 'espn', winningUser: 'Rob', winningTeam: 'The ToddFather Part 2',  losingUser: 'Thomas', losingTeam: 'Well Darn', punishment: 'Wore a dildo to the FoCo bars'}, 
    {year: '2016', platform: 'espn', winningUser: 'Conor', winningTeam: 'Curb Check', losingUser: 'John Brady', losingTeam: 'At Least Im Not at Wyoming', punishment: 'Did not follow through on head shaving'},
    {year: '2015', platform: 'espn', winningUser: 'Cody', winningTeam: 'LOL Hiroshima',  losingUser: 'Thomas', losingTeam: 'Comeback Time Bitches', punishment: ' Did Standup Comedy'},
    {year: '2014', platform: 'espn', winningUser: 'Ryan', winningTeam: 'The Rylo Show', losingUser: 'Perez', losingTeam: 'FUCK MARSHAWN LYNCH', punishment: 'Got Kicked out of the league'},
];

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


// Remaining Steps

// Transform ESPN Data - League Summaries
// Transform Sleeper Data - League Summaries
// Run an insert with the transactions array of objects


// Pull all JSON Data
try {

    console.log('Extracting Data... ')
    // Pull Data from MongoDB for league Members
    const {data: members} = await axios.get('http://localhost:4000/api/leagueMembers');

    // Pull data from ESPN leagues where the privacy blocks me from grabbing it directly
    const rawData2014 = JSON.parse(fs.readFileSync('./data/leagueData2014.json'))[0];
    const rawData2015 = JSON.parse(fs.readFileSync('./data/leagueData2015.json'))[0];
    const rawData2016 = JSON.parse(fs.readFileSync('./data/leagueData2016.json'))[0];
    const rawData2017 = JSON.parse(fs.readFileSync('./data/leagueData2017.json'))[0];
    const rawData2018 = JSON.parse(fs.readFileSync('./data/leagueData2018.json'));
    const rawData2019 = JSON.parse(fs.readFileSync('./data/leagueData2019.json'));

    // Pull data from public ESPN leagues
    const {data: rawData2020} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/${322485}?view=mTeam&view=mBoxscore`);
    const {data: rawData2022} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/${322485}?view=mTeam&view=mBoxscore`);

    // Pull data from Sleeper Leagues
    const rawData2021 = await fetchSleeperData(leagueId2021);

    // Begin Transforming Data
    console.log('Transforming Data...')

    // initialize variable to host all processed data
    let seasons = [];

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

    // Process ESPN Data
    for(const season of rawEspnSeasons){
        let processedData = processEspnData(season.rawData);
        seasons.push(processedData);
    }

    // Process Sleeper Data
    let processedData = processSleeperData(rawData2021);
    seasons.push(processedData);

    // sort final array based on year
    seasons.sort((a,b) => a.season - b.season);
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
    const countGames =  16 // might need to change this based on season length
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
    const countGames = 16 // might need to change this based on season length
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
    let teams = []; 
    for(const team of seasonData.teams) {
        let tempTeam = {
            team_id: team.id,
            team_name: team.name,
            owners: team.owners,
            transactions: {
                adds: team.transactionCounter.acquisitions,
                trades: team.transactionCounter.trades
            }
        }
        teams.push(tempTeam);
    }
    return {season: seasonData.seasonId, teams};
}

function processSleeperData(seasonData){
    // Initialize Teams Array
    let teams = [];

    // Create Roster Maps
    let rosterIdMap = {};
    let ownerIdMap = {};
    for(const roster of seasonData.rosters){
        rosterIdMap[roster.roster_id] = roster;
        rosterIdMap[roster.roster_id].weeklyPointsFor = [];
        rosterIdMap[roster.roster_id].weeklyPointsAgainst = [];
        rosterIdMap[roster.roster_id].weeklyExectedWins = [];
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

    // Populate array with data
    for(const user of seasonData.users){
        const roster = ownerIdMap[user.user_id];
        if(roster){
            teams.push({
                owners: [roster.owner_id],
                team_id: roster.roster_id,
                team_name: user.metadata.team_name,
                transactions : {
                    adds: roster.adds,
                    trades: roster.trades
                }
            });
        }
    }

    teams.sort((a,b) => a.team_id - b.team_id);

    // Conor - Debugging statement here to show my teams
    // console.log(ownerIdMap['730905664234332160']);

    return {season: seasonData.season, teams}
}

