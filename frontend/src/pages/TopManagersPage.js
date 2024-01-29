import axios from "axios";
import { useState, useEffect } from "react";
import TopManagersPoints from "../components/TopManagersPoints";
import TopManagersChamps from "../components/TopManagersChamps";
import TopManagersRecords from "../components/TopManagersRecords";
import TopManagersAveragePlayoffSeed from "../components/TopManagersAveragePlayoffSeed";
import TopManagersActivity from "../components/TopManagersActivity";
import TopManagersLuckRating from "../components/TopManagersLuckRating";


function TopManagersPage(){
    const [loading, setLoading] = useState([]);
    const [members, setMembers] = useState([]);
    const [seasons, setSeasons] = useState([]);


    useEffect(() => {
        setLoading(true);
        getLeagueResults();
    }, []);

    const getLeagueResults = async() => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: membersRaw} = await axios.get('/api/leagueMembers');
        const members = processData(seasonsRaw, membersRaw);
        setMembers(members);
        setSeasons(seasonsRaw);
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

            managerLookup[member._id] = member;
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
                <TopManagersActivity members={members}/>
                <TopManagersLuckRating members={members} seasons={seasons}/>
            </div>
        )
    }
}

export default TopManagersPage;