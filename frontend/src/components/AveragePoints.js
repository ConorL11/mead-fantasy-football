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

    const maxAveragePoints = Math.max(...currentAveragePoints.map(team => team.settings.average_points));


    return(
        <div className="averagePointsContainer">
            <h1>Average Weekly Points</h1>
            <h3>{maxAveragePoints}</h3>
            {currentAveragePoints.map(team => (
                <div key={team.user_id} className="teamBar">
                     <div className="teamName">{team.display_name}</div>
                     <div className="flexHorizontal">
                        {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                        {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                        <div className={`coloredBar`} style={{ width: `${(team.settings.average_points / maxAveragePoints) * 90 }%` }}>
                            <div className="teamPoints">{team.settings.average_points.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default AveragePoints;