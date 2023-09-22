import { useEffect } from "react";
import CPIRankings from "../components/CPIRankings";
import axios from "axios";


function ConorsPowerIndex({show}){

    const leagueId = '990427440436625408';
    const fetchData = async () => {
        const nflStateUrl = 'https://api.sleeper.app/v1/state/nfl';
        const usersUrl = 'https://api.sleeper.app/v1/league/'+leagueId+'/users';
        const rostersUrl = 'https://api.sleeper.app/v1/league/'+leagueId+'/rosters';
        const cpiUrl = 'http://localhost:3005/cpi2023';

        const getNflState = axios.get(nflStateUrl);
        const getUsers = axios.get(usersUrl);
        const getRosters = axios.get(rostersUrl);
        const getCpi = axios.get(cpiUrl);

        await axios.all([getNflState, getUsers, getRosters, getCpi]).then(
            axios.spread((...responses) => {
                const currentWeek = responses[0].data.week - 1;
                const users = responses[1].data;
                const rosters = responses[2].data;
                const cpiData = responses[3].data;

                if(currentWeek > cpiData.length){
                    for(const user of users){
                        const roster = rosters.find(roster => roster.owner_id === user.user_id);
                        if (roster) {
                            user.settings = roster.settings;
                            user.settings.winning_pct = user.settings.wins + user.settings.ties + user.settings.losses > 0 ? user.settings.wins / user.settings.wins + user.settings.ties + user.settings.losses : 0;
                            user.settings.cpiRating = Math.floor(Math.random()*100);
                            user.avatar_link = "https://sleepercdn.com/avatars/thumbs/"+ user.avatar;
                        }
                    }
                    postData(currentWeek, users);
                }
            })
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postData = async (currentWeek, data) => {
        await axios.post("http://localhost:3005/cpi2023", {
            week: currentWeek,
            data: data
        });
    };

    return (
        <div className="">
           <CPIRankings />
        </div>
    )
}

export default ConorsPowerIndex;