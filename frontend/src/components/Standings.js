import { useState, useEffect } from "react";
import axios from "axios";
import { currentLeagueId, censorContent } from "../content/constants";

function Standings(){
    const [currentStandings, setCurrentStandings] = useState([]);
    const fetchStandings = async () => {
        const responseLeagueMembers = await axios.get('/api/leagueMembers');
        const responseUsers = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/users");
        const responseRosters = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/rosters");

        const leagueMembers = responseLeagueMembers.data;
        const users = responseUsers.data; 
        const rosters = responseRosters.data.sort();
        for(const user of users){
            const roster = rosters.find(roster => roster.owner_id === user.user_id);
            if (roster) {
                user.settings = roster.settings;
                user.settings.winning_pct = (user.settings.wins + user.settings.ties + user.settings.losses) > 0 ? user.settings.wins / (user.settings.wins + user.settings.ties + user.settings.losses) : 0;
                user.avatar_link = "https://sleepercdn.com/avatars/thumbs/"+ user.avatar;
            }
        }
        users.sort((a,b) => b.settings.wins - a.settings.wins);

        // Clean up response data
        for(const user of users){
            // Assign Nickname to User Object from leagueMembers Back End
            user.user_name = leagueMembers.find(member => member.sleeper_ids.some(id => id === user.user_id ) ).user_name;

            if(!user.settings.winning_pct){
                user.settings.winning_pct = 0;
            }
            if(user.settings.fpts_decimal !== 0){
                user.settings.fpts = user.settings.fpts + user.settings.fpts_decimal/100;
            }
            if(user.settings.fpts_against_decimal !== 0){
                user.settings.fpts_against = user.settings.fpts_against + user.settings.fpts_against_decimal/100;
            }
        }

        // Calc Games Behind
        for(let i = 0; i < users.length; i++){
            users[i].settings.games_behind = users[0].settings.wins - users[i].settings.wins; 
        }
        setCurrentStandings(users)
    };

    useEffect(() => {
        fetchStandings()
    }, []);

    return(
        <div className="table-container">
            <table className="myTable">
                <caption>League Standings</caption>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Pct</th>
                        <th>Games Behind</th>
                        <th>Points For</th>
                        <th>Points Against</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStandings.map(team => (
                        <tr key={team.user_id}>
                            <td data-cell="Team">
                                {censorContent ? 
                                    <div className="team-display flexHorizontal">
                                        <div className="smallAvatar"><img src={`/headshots/${team.member_id}.png`} alt="" /></div>
                                        <div className="ml_1">
                                            <div>{team.user_name}</div>
                                        </div>
                                    </div> : 
                                    <div className="team-display flexHorizontal">
                                        {team.metadata.avatar && <div className="smallAvatar"><img src={team.metadata.avatar} alt="" width="50" height="50"/></div>}
                                        {!team.metadata.avatar &&<div className="smallAvatar"><img src={team.avatar_link} alt="" width="50" height="50"/></div>}
                                        <div className="ml_1">
                                            <div>
                                                <div>{team.metadata.team_name}</div>
                                                <div className="subText">({team.display_name})</div>
                                            </div>
                                        </div>
                                    </div> 
                                }
                            </td>
                            <td data-cell="Wins">{team.settings.wins}</td>
                            <td data-cell="Losses">{team.settings.losses}</td>
                            <td data-cell="Pct">
                                <div>{(team.settings.winning_pct*100).toFixed(0)}%</div>
                            </td>
                            <td data-cell="Games Behind">{team.settings.games_behind}</td>
                            <td data-cell="Points For">{team.settings.fpts}</td>
                            <td data-cell="Points Against">{team.settings.fpts_against}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Standings;