import axios from "axios";
import { useState, useEffect } from "react";
import TopManagersPoints from "../components/topmanagers/TopManagersPoints";
import TopManagersChamps from "../components/topmanagers/TopManagersChamps";
import TopManagersRecords from "../components/topmanagers/TopManagersRecords";
import TopManagersAveragePlayoffSeed from "../components/topmanagers/TopManagersAveragePlayoffSeed";
import TopManagersActivity from "../components/topmanagers/TopManagersActivity";
import TopManagersLuckRating from "../components/topmanagers/TopManagersLuckRating";
import TopManagersPlayoffAppearances from "../components/topmanagers/TopManagersPlayoffAppearances";


function TopManagersPage(){
    const [loading, setLoading] = useState([]);
    const [members, setMembers] = useState([]);
    // const [seasons, setSeasons] = useState([]);


    useEffect(() => {
        setLoading(true);
        getLeagueResults();
    }, []);

    const getLeagueResults = async() => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: membersRaw} = await axios.get('/api/leagueMembers');
        const members = processData(seasonsRaw, membersRaw);
        setMembers(members);
        setLoading(false);
    }

    const processData = (seasons, members) => {

        // Build Lookup Objects for managers
        let ownerLookup = {};
        let managerLookup = {};
        for(const member of members){
            // Initialize counters

            //Total Points Counts
            member.points = 0;
            member.games = 0;

            //Champs Counts
            member.championships = 0;
            member.biggestLosers = 0;

            //Record Counts
            member.wins = 0;
            member.losses = 0;

            //Playoff Seeds
            member.seedTotal = 0;
            member.seasons = 0;

            // Activity
            member.adds = 0;
            member.trades = 0;

            // Expected Wins
            member.expectedWins = 0;

            // Playoff Appearances
            member.playoffAppearances = 0;

            managerLookup[member.user_id] = member;
            for(const id of member.espn_ids){
                ownerLookup[id] = member;
            }
            for(const id of member.sleeper_ids){
                ownerLookup[id] = member;
            }
        }

        // Loop over seasons and teams to count relevant stats
        for(const season of seasons){
            managerLookup[season.results.championUser].championships += 1;
            managerLookup[season.results.losingUser].biggestLosers += 1;

            for(const team of season.teams){
                ownerLookup[team.owners[0]].points += team.summary.regularSeason.points;
                ownerLookup[team.owners[0]].games += (team.summary.regularSeason.wins + team.summary.regularSeason.losses);
                ownerLookup[team.owners[0]].wins += team.summary.regularSeason.wins;
                ownerLookup[team.owners[0]].losses += team.summary.regularSeason.losses;
                ownerLookup[team.owners[0]].seedTotal += team.summary.regularSeason.playoffSeed;
                ownerLookup[team.owners[0]].seasons ++;
                ownerLookup[team.owners[0]].adds += team.transactions.adds;
                ownerLookup[team.owners[0]].trades += team.transactions.trades;
                ownerLookup[team.owners[0]].expectedWins += team.summary.regularSeason.expectedWins;
                ownerLookup[team.owners[0]].playoffAppearances += (team.summary.regularSeason.playoffSeed <= 6) ? 1 : 0;
            }
        }

        return members
    }

    if(loading){
        return(
            <div className="loadingContainer">
                <div>Loading Manager Data.....</div>
                <div className="spinner"></div>
            </div>
        )
    } else {
        return(
            <div className="sleeperInsights">
                <TopManagersChamps members={members}/>
                <TopManagersPoints members={members}/>
                <TopManagersRecords members={members}/>
                <TopManagersAveragePlayoffSeed members={members}/>
                <TopManagersPlayoffAppearances members={members}/>
                <TopManagersLuckRating members={members}/>
                <TopManagersActivity members={members}/>
            </div>
        )
    }
}

export default TopManagersPage;