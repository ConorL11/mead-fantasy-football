import { useState, useEffect } from "react";
import axios from "axios";
import { currentLeagueId, censorContent } from "../content/constants";
import AveragePoints from "./AveragePoints";
import StandardDeviation from "./StandardDevation";
import KeyMatchups from "./KeyMatchups";
import ManagerActivity from "./ManagerActivity";
import LuckRating from "./LuckRating";
import OutlierWeeks from "./OutlierWeeks";

function SleeperData(){
    const [loading, setLoading] = useState([]);
    const [sleeperScores, setSleeperScores] = useState([]);
    const [closeGames, setCloseGames] = useState([]);
    const [blowoutGames, setBlowoutGames] = useState([]);

    const fetchSleeperData = async () => {

        const responseLeagueMembers = await axios.get('/api/leagueMembers');
        const responseNflState = await axios.get("https://api.sleeper.app/v1/state/nfl");
        const responseUsers = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/users");
        const responseRosters = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/rosters");


        const leagueMembers = responseLeagueMembers.data;
        const currentWeek = responseNflState.data.week;
        const users = responseUsers.data; 
        const rosters = responseRosters.data.sort();

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

        // Append Matchup Data to Rosters and retrieve array of all Matchups to date
        const allMatchups = await fetchMatchups(currentWeek, rosterIdMap);
        const {closeGames, blowoutGames} = findKeyMatchups(allMatchups);

        setCloseGames(closeGames);
        setBlowoutGames(blowoutGames);

        // Append Transaction Counts to Rosters
        await fetchTransactions(currentWeek, rosterIdMap);

        for(const user of users){
            const roster = ownerIdMap[user.user_id];
            if (roster) {
                user.roster_id = roster.roster_id;
                user.settings = roster.settings;
                user.settings.games_played = (user.settings.wins + user.settings.ties + user.settings.losses);
                user.settings.winning_pct = (user.settings.wins + user.settings.ties + user.settings.losses) > 0 ? user.settings.wins / (user.settings.wins + user.settings.ties + user.settings.losses) : 0;
                user.avatar_link = "https://sleepercdn.com/avatars/thumbs/"+ user.avatar;
                user.weeklyPointsFor = roster.weeklyPointsFor;
                user.weeklyPointsAgainst = roster.weeklyPointsAgainst;
                user.weeklyExectedWins = roster.weeklyExectedWins;
                user.expectedWins = roster.weeklyExectedWins.reduce((acc, value) => acc + value);
                user.luckRating = user.settings.wins - user.expectedWins;
                user.trades = roster.trades;
                user.adds = roster.adds;
                user.totalTransactions = user.trades + user.adds;
            }
        }
        
        // Clean up response data and add metrics for insights
        for(const user of users){
            // Assign Nickname to User Object from leagueMembers Back End
            user.nickname = leagueMembers.find(member => member.sleeper_id === user.user_id).user_nickname;
            user.user_name = leagueMembers.find(member => member.sleeper_id === user.user_id).user_name;

            // by default sleeper API has this as undefined at the start of a season. Comment written in 2023 at start of the sesason
            if(!user.settings.winning_pct){
                user.settings.winning_pct = 0;
            }

            user.settings.fpts = user.settings.fpts + user.settings.fpts_decimal / 100;
            user.settings.average_points = user.settings.fpts / user.settings.games_played;
            user.settings.fpts_against = user.settings.fpts_against + user.settings.fpts_against_decimal/100;

            delete user.settings.fpts_decimal;
            delete user.settings.fpts_against_decimal;

            // Standard Deviation Calculation
            let varSum = 0;
            for(const week of user.weeklyPointsFor){
                varSum += Math.pow((week.points - user.settings.average_points),2);
            }
            user.settings.standard_deviation = Math.pow((varSum / currentWeek-1),0.5);
        }

        setSleeperScores(users);
        setLoading(false);

    };




    // Function to pull weekly matchups from Sleeper API, assign them to each roster object, and return array of all Matchups retrieved from the API
    const fetchMatchups = async (currentWeek, rosterIdMap) => {
        let allMatchups = [];
        let usedMatchups = [];
        for(let i=1; i < currentWeek; i++){
            let responseWeek = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/matchups/"+i);
            let week = responseWeek.data;

            week.sort((a,b) => a.points - b.points);

            for(const [index, matchup] of week.entries()){
                let opponent = week.find((w) => w.matchup_id === matchup.matchup_id && w.roster_id !== matchup.roster_id);
                if(usedMatchups.indexOf('week-'+i+'-matchup-'+matchup.matchup_id) === -1){
                    usedMatchups.push('week-'+i+'-matchup-'+matchup.matchup_id);
                    allMatchups.push({
                        key: 'week-'+i+'-matchup-'+matchup.matchup_id,
                        week: i,
                        differential: Math.abs(matchup.points - opponent.points).toFixed(2),
                        player1: matchup.roster_id,
                        player2: opponent.roster_id
                    });
                }
                rosterIdMap[matchup.roster_id].weeklyExectedWins.push(index/ (week.length-1))
                rosterIdMap[matchup.roster_id].weeklyPointsFor.push(matchup);
                rosterIdMap[matchup.roster_id].weeklyPointsAgainst.push(opponent);
            }
        }
        return allMatchups;
    }



    // Function to get transactions and assign them to roster ID Map
    const fetchTransactions = async (currentWeek, rosterIdMap) => {
        // Pull in Transactions and append to users via Roster Id Map
        for(let i = 1; i < currentWeek; i++){
            const week = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/transactions/"+i);
            for(const transaction of week.data){
                for(const rosterId of transaction.roster_ids){
                    transaction.type === 'trade' ? rosterIdMap[rosterId].trades ++  : rosterIdMap[rosterId].adds ++;
                }
            }
        }
    }

    // function to sort and select best and worst matchups when given an array of all matchups with the point differnetials
    const findKeyMatchups = (matchups) => {
        matchups.sort((a,b) => a.differential - b.differential);
        const closeGames = matchups.slice(0,5);
        const blowoutGames = matchups.slice(matchups.length - 5, matchups.length );
        blowoutGames.sort((a,b) => b.differential - a.differential);

        return {closeGames, blowoutGames};
    }

    useEffect(() => {
        setLoading(true);
        fetchSleeperData();
    }, []);


    if(loading){
        return(
            <div className="loadingContainer">
                <div>Loading Sleeper Data.....</div>
                <div className="spinner"></div>
            </div>
        )
    } else {
        return (
            <div className="sleeperInsights">
                <AveragePoints sleeperScores={sleeperScores} censorContent={censorContent}/>
                <ManagerActivity users={sleeperScores}  censorContent={censorContent}/>
                <StandardDeviation sleeperScores={sleeperScores} censorContent={censorContent}/>
                <KeyMatchups closeGames={closeGames} blowoutGames={blowoutGames} sleeperScores={sleeperScores} censorContent={censorContent}/>
                <LuckRating teams={sleeperScores} censorContent={censorContent}/>
                <OutlierWeeks teams={sleeperScores} censorContent={censorContent}/>
            </div>
        )
    }
}

export default SleeperData;