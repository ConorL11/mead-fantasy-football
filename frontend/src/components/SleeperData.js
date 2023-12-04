import { useState, useEffect } from "react";
import axios from "axios";
import { currentLeagueId } from "../content/constants";
import AveragePoints from "./AveragePoints";
import StandardDeviation from "./StandardDevation";

function SleeperData(){
    const [loading, setLoading] = useState([]);
    const [sleeperScores, setSleeperScores] = useState([]);

    const fetchSleeperData = async () => {

        const responseNflState = await axios.get("https://api.sleeper.app/v1/state/nfl");
        const responseUsers = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/users");
        const responseRosters = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/rosters");

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
            ownerIdMap[roster.owner_id] = roster;
        }

        // Append Matchup Data to Rosters and retrieve array of all Matchups to date
        await fetchMatchups(currentWeek, rosterIdMap);

        for(const user of users){
            const roster = ownerIdMap[user.user_id];
            if (roster) {
                user.settings = roster.settings;
                user.settings.games_played = (user.settings.wins + user.settings.ties + user.settings.losses);
                user.settings.winning_pct = (user.settings.wins + user.settings.ties + user.settings.losses) > 0 ? user.settings.wins / (user.settings.wins + user.settings.ties + user.settings.losses) : 0;
                user.avatar_link = "https://sleepercdn.com/avatars/thumbs/"+ user.avatar;
                user.weeklyPointsFor = roster.weeklyPointsFor;
                user.weeklyPointsAgainst = roster.weeklyPointsAgainst;
            }
        }

        // Clean up response data and add metrics for insights
        for(const user of users){
            if(!user.settings.winning_pct){
                user.settings.winning_pct = 0;
            }
            if(user.settings.fpts_decimal !== 0){
                user.settings.fpts = user.settings.fpts + user.settings.fpts_decimal/100;
                user.settings.average_points = user.settings.fpts / user.settings.games_played;
            }
            if(user.settings.fpts_against_decimal !== 0){
                user.settings.fpts_against = user.settings.fpts_against + user.settings.fpts_against_decimal/100;
            }

            // Standard Deviation Calculation
            let varSum = 0;
            for(const week of user.weeklyPointsFor){
                varSum += Math.pow((week.points - user.settings.average_points),2);
            }
            // console.log(varSum)
            user.settings.standard_deviation = Math.pow((varSum / currentWeek-1),0.5);
        }

        setSleeperScores(users);
        setLoading(false);
    };


    // Function to pull weekly matchups from Sleeper API, assign them to each roster object, and return array of all Matchups retrieved from the API
    const fetchMatchups = async (currentWeek, rosterIdMap) => {
        for(let i=1; i < currentWeek; i++){
            let responseWeek = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/matchups/"+i);
            let week = responseWeek.data;

            for(const matchup of week){
                let opponent = week.find((w) => w.matchup_id === matchup.matchup_id && w.roster_id !== matchup.roster_id);
                rosterIdMap[matchup.roster_id].weeklyPointsFor.push(matchup);
                rosterIdMap[matchup.roster_id].weeklyPointsAgainst.push(opponent);
            }

        }
        // return allMatchups;
    }

    // const findKeyMatchups = (currentWeek, users) => {
    //     let allMatchups = [];
    //     let worstMatchups = [];
    //     let bestMatchups = [];

    //     for(const user of users){
    //         for(let i=0; i<currentWeek; i++){
    //             allMatchups.push({

    //             })
    //         }
    //     }

    //     return {worstMatchups, bestMatchups}
    // }


    // // CONOR HYPOTHETICAL END DATA MODEL 

    // const bestMatchups = [
    //     week: 1,
    //     differential = 60,
    //     info: {

    //     }
    // ]



    useEffect(() => {
        setLoading(true);
        fetchSleeperData();
    }, []);


    if(loading){
        return(
            <div>
                Loading Cool Data from Sleeper.....
            </div>
        )
    } else {
        return (
            <div className="sleeperInsights">
                <AveragePoints sleeperScores={sleeperScores} />
                <StandardDeviation sleeperScores={sleeperScores} />
            </div>

        )
    }
}

export default SleeperData;