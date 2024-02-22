import axios from "axios";
import { useEffect, useState } from "react";
import LoadingMessage from "../global/LoadingMessage";

function SeasonResults(){

    const[loading, setLoading] = useState(true);
    const [seasonResults, setSeasonResults] = useState([]);

    useEffect(() => {
        const getLeagueResults = async() => {
            const latestSeason = 2023;
            const {data: [season]} = await axios.get(`/api/seasons/${latestSeason}`);
            const {data: members} = await axios.get('/api/leagueMembers');
            const processedSeason = processData(season, members);
            setSeasonResults(processedSeason);
            setLoading(false);
        }

        const processData = (season, members) => {

            // Build Lookup Objects for members
            let memberLookup = {};
            let espnMemberLookup = {};
            let sleeperMemberLookup = {};
    
            for(const member of members){
                memberLookup[member.user_id] = member
                for(const id of member.espn_ids){
                    espnMemberLookup[id] = member;
                }
                for(const id of member.sleeper_ids){
                    sleeperMemberLookup[id] = member;
                }
            }
    
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

            const processedSeason = {
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
            };
    
            return processedSeason;
        }

        getLeagueResults();
    }, []);

    // function to take a teamLookup and an owners array and find a match and return the stats
    const getStats = (teamLookup, owners) => {
        for(const owner of owners){
            var stats = teamLookup[owner];
            if(stats){
                break;
            }
        }
        return stats;
    }

    if(loading){
        return(
            <div className="trophyRoom">
                <h2 >Loading Latest Season Results</h2>
                <div className="seasonResultsGrid insightContainer">
                    <div className="trophyRoomUserCard trophyRoomChampion">
                        <h2>League Champion</h2>
                        <div></div>
                    </div>
                    <div className="trophyRoomUserCard trophyRoomRunnerUp">
                        <h3>Runner Up</h3>
                        <div></div>

                    </div>
                    <div className="trophyRoomUserCard trophyRoomLoser" >
                        <h3>Biggest Loser</h3>
                        <div></div>

                    </div>
                    <div className="trophyRoomUserCard trophyRoomHighScorer">
                        <h3>High Scorer </h3>
                        <div></div>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="seasonResults">
                <div className="seasonResultsGrid">
                    <h2 className="seasonResultsHeader">{seasonResults.season} Results</h2>
                    <div className="trophyRoomUserCard trophyRoomChampion">
                        <h3>League Champion</h3>
                        <div ><img className="mediumAvatar" src={`/headshots/${seasonResults.champion.user.user_id}.png`} alt=""/></div>
                        <div>{seasonResults.champion.user.user_name}</div>
                        <div>{seasonResults.champion.stats.summary.regularSeason.wins} - {seasonResults.champion.stats.summary.regularSeason.losses}</div>
                        <div>{(seasonResults.champion.stats.summary.regularSeason.points / (seasonResults.champion.stats.summary.regularSeason.wins + seasonResults.champion.stats.summary.regularSeason.losses)).toFixed(1)} PPG</div>
                        <div>{(seasonResults.champion.stats.summary.regularSeason.pointsAgainst / (seasonResults.champion.stats.summary.regularSeason.wins + seasonResults.champion.stats.summary.regularSeason.losses)).toFixed(1)} OPPG</div>
                    </div>
                    <div className="trophyRoomUserCard trophyRoomRunnerUp">
                        <h3>Runner Up</h3>
                        <div ><img className="mediumAvatar" src={`/headshots/${seasonResults.runnerUp.user.user_id}.png`} alt=""/></div>
                        <div>{seasonResults.runnerUp.user.user_name}</div>
                        <div>{seasonResults.runnerUp.stats.summary.regularSeason.wins} - {seasonResults.runnerUp.stats.summary.regularSeason.losses}</div>
                        <div>{(seasonResults.runnerUp.stats.summary.regularSeason.points / (seasonResults.runnerUp.stats.summary.regularSeason.wins + seasonResults.runnerUp.stats.summary.regularSeason.losses)).toFixed(1)} PPG</div>
                        <div>{(seasonResults.runnerUp.stats.summary.regularSeason.pointsAgainst / (seasonResults.runnerUp.stats.summary.regularSeason.wins + seasonResults.runnerUp.stats.summary.regularSeason.losses)).toFixed(1)} OPPG</div>
                    </div>
                    <div className="trophyRoomUserCard trophyRoomLoser" >
                        <h3>Biggest Loser</h3>
                        <div ><img className="mediumAvatar" src={`/headshots/${seasonResults.loser.user.user_id}.png`} alt=""/></div>
                        <div>{seasonResults.loser.user.user_name}</div>
                        <div>{seasonResults.loser.stats.summary.regularSeason.wins} - {seasonResults.loser.stats.summary.regularSeason.losses}</div>
                        <div>{(seasonResults.loser.stats.summary.regularSeason.points / (seasonResults.loser.stats.summary.regularSeason.wins + seasonResults.loser.stats.summary.regularSeason.losses)).toFixed(1)} PPG</div>
                        <div>{(seasonResults.loser.stats.summary.regularSeason.pointsAgainst / (seasonResults.loser.stats.summary.regularSeason.wins + seasonResults.loser.stats.summary.regularSeason.losses)).toFixed(1)} OPPG</div>
                    </div>
                    <div className="trophyRoomUserCard trophyRoomHighScorer">
                        <h3>High Scorer </h3>
                        <div ><img className="mediumAvatar" src={`/headshots/${seasonResults.highScorer.user.user_id}.png`} alt=""/></div>
                        <div>{seasonResults.highScorer.user.user_name}</div>
                        <div>{seasonResults.highScorer.stats.summary.regularSeason.wins} - {seasonResults.highScorer.stats.summary.regularSeason.losses}</div>
                        <div>{(seasonResults.highScorer.stats.summary.regularSeason.points / (seasonResults.highScorer.stats.summary.regularSeason.wins + seasonResults.highScorer.stats.summary.regularSeason.losses)).toFixed(1)} PPG</div>
                        <div>{(seasonResults.highScorer.stats.summary.regularSeason.pointsAgainst / (seasonResults.highScorer.stats.summary.regularSeason.wins + seasonResults.highScorer.stats.summary.regularSeason.losses)).toFixed(1)} OPPG</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SeasonResults;