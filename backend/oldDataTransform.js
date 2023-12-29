
import axios from "axios";
import { readFile } from 'fs/promises';
import fs from 'fs'
// import { pastWinners } from "../../frontend/src/content/constants";

// constants for league access
const leagueId2021 = '730899355048996864';
const espnLeagueId = '322485';

// ESPN API v2 - works for seasons 2017 and earlier
// https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/322485?seasonId=2017&view=mTeam

// ESPN API v3 - works for seasons 2018 on
// https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/322485?view=mTeam

// Completed Steps
// 1 - Pull League Data for each season
// 2 - Pull leagueMembers from Mongo
// 3 - Pull League History JSON Object from Data / Consants



// Remaining Steps
// Fully Build out Desired Data Structure for DB
// Modify ESPN Calls so I can get matchup data included. Re-import new JSON files with Matchup Data included
// Transform ESPN Data
// Transform Sleeper Data
// Run an insert with the transactions array of objects


// Pull all JSON Data
try {

    const {data: members} = await axios.get('http://localhost:4000/api/leagueMembers');

    // Pull data from ESPN leagues where the privacy blocks me from grabbing it directly
    const data2014 = JSON.parse(fs.readFileSync('./data/leagueData2014.json'))[0];
    const data2015 = JSON.parse(fs.readFileSync('./data/leagueData2015.json'))[0];
    const data2016 = JSON.parse(fs.readFileSync('./data/leagueData2016.json'))[0];
    const data2017 = JSON.parse(fs.readFileSync('./data/leagueData2017.json'))[0];
    const data2018 = JSON.parse(fs.readFileSync('./data/leagueData2018.json'));
    const data2019 = JSON.parse(fs.readFileSync('./data/leagueData2019.json'));

    // Pull data from public ESPN leagues
    const {data: data2020} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/${322485}?view=mTeam`);
    const {data: data2022} = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/${322485}?view=mTeam`);

    // Pull Transaction Data from Sleeper
    const data2021 = await fetchSleeperData(leagueId2021);


    console.log(members);
    debugger

} catch (error) {
    console.log(error);
}



// Sleeper Function
async function fetchSleeperData(leagueId){
    const {data: users} = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/users");
    const {data: rosters} = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/rosters");

    // Create Roster Maps
    let rosterIdMap = {};
    let ownerIdMap = {};
    for(const roster of rosters){
        rosterIdMap[roster.roster_id] = roster;
        rosterIdMap[roster.roster_id].weeklyPointsFor = [];
        rosterIdMap[roster.roster_id].weeklyPointsAgainst = [];
        rosterIdMap[roster.roster_id].weeklyExectedWins = [];

        rosterIdMap[roster.roster_id].trades = 0;
        rosterIdMap[roster.roster_id].adds = 0;
        ownerIdMap[roster.owner_id] = roster;
    }

    const transactions = await fetchSleeperTransactions(leagueId);
    const sleeperData = {users, rosters, transactions}
    return sleeperData
}




// Function to fetch Sleeper Transactions for completed seasons 
async function fetchSleeperTransactions(leagueId, year) {
    let allTransactions = [];
    const countGames =  16 // might need to change this based on season length
    for(let i=1; i <= countGames; i++){
        let responseTransactions = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/transactions/"+i);
        allTransactions.push(responseTransactions.data);
    }
    return allTransactions;
}