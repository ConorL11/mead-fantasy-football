import axios from "axios";
import { useEffect, useState } from "react";

function Champions(){
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        getLeagueResults();
    }, []);

    const getLeagueResults = async() => {
        const {data: seasons} = await axios.get('/api/seasons');
        const {data: members} = await axios.get('/api/leagueMembers');
        const champions = processData(seasons, members);
        console.log('champions', champions)
        setChampions(champions) ;
    }

    const processData = (seasons, members) => {

        let champions = []

        // Build Lookup Objects for members
        let memberLookup = {};
        let espnMemberLookup = {};
        let sleeperMemberLookup = {};
        for(const member of members){
            memberLookup[member._id] = member
            for(const id of member.espn_ids){
                espnMemberLookup[id] = member;
            }
            for(const id of member.sleeper_ids){
                sleeperMemberLookup[id] = member;
            }
        }

        for(const season of seasons){

            // build team lookup object
            let teamLookup = {};
            for(const team of season.teams){
                for(const owner of team.owners){
                    teamLookup[owner] = team;
                }
            }

            // get users for champion, loser, and runner up
            let championUser = memberLookup[season.results.championUser];
            let runnerUpUser = memberLookup[season.results.runnerUpUser];
            let loserUser = memberLookup[season.results.losingUser];

            // assign ids to owner arrays
            let championOwners;
            let runnerUpOnwers;
            let loserOwners;
            if(season.results.platform === 'espn'){
                championOwners = championUser.espn_ids;
                runnerUpOnwers = runnerUpUser.espn_ids;
                loserOwners = loserUser.espn_ids;

            } else {
                championOwners = championUser.sleeper_ids;
                runnerUpOnwers = runnerUpUser.sleeper_ids;
                loserOwners = loserUser.sleeper_ids;
            }

            // Get Stats for owners
            let championStats = getStats(teamLookup, championOwners);
            let reunnerUpStats = getStats(teamLookup, runnerUpOnwers);
            let loserStats = getStats(teamLookup, loserOwners);


            // get high scorer stats and user
            let highScorerStats = season.teams.sort((a,b) => b.summary.regularSeason.points - a.summary.regularSeason.points)[0];
            for(const owner of highScorerStats.owners){
                var highScorerUser = season.results.platform === 'espn' ? espnMemberLookup[owner] : sleeperMemberLookup[owner];
            }


            champions.push({
                season: season.season,
                champion: {
                    user: championUser,
                    stats: championStats
                },
                runnerUp: {
                    user: runnerUpUser,
                    stats: reunnerUpStats
                },
                loser: {
                    user: loserUser,
                    stats: loserStats
                },
                highScorer: {
                    user: highScorerUser,
                    stats: highScorerStats
                }
            });
        }

        champions.sort((a,b) => b.season - a.season);
        return champions
    }

    // function to take a teamLookup and an owners array and find a match and return the stats
    const getStats = (teamLookup, owners) => {
        for(const owner of owners){
            var stats = teamLookup[owner];
            if(stats){
                break;
            }
        }
        return stats
    }
    
    return (
        <div>
            <h1>Trophy Room</h1>
            {champions.map(season => (
                <div key={season.season}>
                    <div className="flexHorizontal">
                        <div>{season.champion.user.user_name}</div>
                    </div> 
                </div>
            ))}
        </div>
    )

}

export default Champions