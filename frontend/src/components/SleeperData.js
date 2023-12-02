import { useState, useEffect } from "react";
import axios from "axios";
import { currentLeagueId } from "../content/constants";

function SleeperData(){
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    const fetchSleeperData = async () => {

        const responseUsers = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/users");
        const responseRosters = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/rosters");
        const responseWeek1 = await axios.get("https://api.sleeper.app/v1/league/"+currentLeagueId+"/matchups/1");


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
        console.log(responseUsers)
        console.log(responseRosters)
        console.log(responseWeek1)

        setData(users);
        setLoading(false);
    };


    useEffect(() => {
        setLoading(true);
        fetchSleeperData();
    }, []);


    if(loading){
        return(
            <div>
                Loading Cool Sleeper Data .....
            </div>
        )
    } 
}

export default SleeperData;