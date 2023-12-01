import { useState, useEffect } from "react";
import axios from "axios";
import { currentLeagueId } from "../content/constants";

function AveragePoints(){
    const [currentAveragePoints, setCurrentAveragePoints] = useState([]);
    
    const fetchAveragePoints = async () => {
        const responseUsers = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/users");
        const responseRosters = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/rosters");

        const users = responseUsers.data; 
        const rosters = responseRosters.data.sort();
        for(const user of users){
            const roster = rosters.find(roster => roster.owner_id === user.user_id);
            if (roster) {
                user.settings = roster.settings;
                user.settings.games_played = (user.settings.wins + user.settings.ties + user.settings.losses);
                user.settings.winning_pct = (user.settings.wins + user.settings.ties + user.settings.losses) > 0 ? user.settings.wins / (user.settings.wins + user.settings.ties + user.settings.losses) : 0;
                user.avatar_link = "https://sleepercdn.com/avatars/thumbs/"+ user.avatar;
            }
        }
        // users.sort((a,b) => b.settings.wins - a.settings.wins);

        // Clean up response data
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
        }

        users.sort((a,b) => b.settings.average_points - a.settings.average_points);

        setCurrentAveragePoints(users);
    };

    useEffect(() => {
        fetchAveragePoints();
    }, []);

    return(
        // CONOR  - Table Display
        // <div className="table-container">
        //     <table className="myTable">
        //         <caption>League Standings</caption>
        //         <thead>
        //             <tr>
        //                 <th>Team</th>
        //                 <th>Average Points</th>

        //             </tr>
        //         </thead>
        //         <tbody>
        //             {currentAveragePoints.map(team => (
        //                 <tr key={team.user_id}>
        //                     <td data-cell="Team">
        //                         <div className="team-display flexHorizontal">
        //                             {team.metadata.avatar && <div className="avatar"><img src={team.metadata.avatar} alt="" width="50" height="50"/></div>}
        //                             {!team.metadata.avatar &&<div className="avatar"><img src={team.avatar_link} alt="" width="50" height="50"/></div>}
        //                             <div className="ml_1">
        //                                 <div>{team.metadata.team_name}</div>
        //                                 <div className="subText">({team.display_name})</div>
        //                             </div>
        //                         </div>
        //                     </td>
        //                     <td data-cell="Games Behind">{team.settings.average_points}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        <div>
            <h1>Average Points Per Week</h1>
            {currentAveragePoints.map(team => (
                <div key={team.user_id}>
                     <div className="subText">{team.display_name}</div>
                     <div>
                        {team.metadata.avatar && <div className="avatar"><img src={team.metadata.avatar} alt="" width="50" height="50"/></div>}
                        {!team.metadata.avatar && <div className="avatar"><img src={team.avatar_link} alt="" width="50" height="50"/></div>}
                    </div>
                </div>
            ))}
        </div>
    )

}

export default AveragePoints;