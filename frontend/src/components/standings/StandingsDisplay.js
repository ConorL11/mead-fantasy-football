import { useState, useEffect } from "react";
import axios from "axios";

function StandingsDisplay({ year }) {
    const [loading, setLoading] = useState(true);
    const [season, setSeason] = useState([]);

    useEffect(() => {
        const getData = async() => {
            const {data: [season]} = await axios.get(`/api/seasons/${year}`);
            const {data: managers} = await axios.get('/api/leaguemembers');
            processData(season, managers);
            setSeason(season);
            setLoading(false);
        }
        const processData = (season, managers) => {
    
            // Create owner map
            let ownerMap = {};
            for(const manager of managers){
                for(const id of manager.espn_ids){
                    ownerMap[id] = manager
                }
                for(const id of manager.sleeper_ids){
                    ownerMap[id] = manager
                }
            }
    
            // Get all manager data assigned to team
            for(const team of season.teams){
                team.manager = ownerMap[team.owners[0]];
                team.summary.regularSeason.winningPct = (team.summary.regularSeason.wins / (team.summary.regularSeason.wins + team.summary.regularSeason.losses));
            }
            season.teams.sort((a,b) => a.summary.regularSeason.playoffSeed - b.summary.regularSeason.playoffSeed);
        }

        getData();
    }, [year]);


    if(loading){
        return(
            <div className="loadingContainer">
                <div>Loading Standings Data.....</div>
                <div className="spinner"></div>
            </div>
        )
    } else {
        return(
            <div className="table-container">
                <table className="myTable">
                    <caption>{year} Standings</caption>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Playoff Seed</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Pct</th>
                            <th>Points For</th>
                            <th>Points Against</th>
                        </tr>
                    </thead>
                    <tbody>
                        {season && season.teams.map(team => (
                            <tr key={team.teamId}>
                                <td data-cell="Team">
                                    <div className="team-display flexHorizontal">
                                        <div className="smallAvatar"><img src={`/headshots/${team.manager.user_id}.png`} alt="" /></div>
                                        <div className="ml_1">
                                            <div>{team.manager.user_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td data-cell="Playoff Seed">{team.summary.regularSeason.playoffSeed}</td>
                                <td data-cell="Wins">{team.summary.regularSeason.wins}</td>
                                <td data-cell="Losses">{team.summary.regularSeason.losses}</td>
                                <td data-cell="Pct">
                                    <div>{(team.summary.regularSeason.winningPct).toFixed(3)}</div>
                                </td>
                                <td data-cell="Points For">{team.summary.regularSeason.points.toFixed(2)}</td>
                                <td data-cell="Points Against">{team.summary.regularSeason.pointsAgainst.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default StandingsDisplay;