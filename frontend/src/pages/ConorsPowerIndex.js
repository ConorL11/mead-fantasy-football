import { useEffect, useState } from "react";
import axios from "axios";


function ConorsPowerIndex({show}){



    const [cpiData, setCpiData] = useState([]);

    // CONOR WORKING HERE
    useEffect(() => {
        // const getCpiData = async () => {
        //     const { data } = await axios.get('/api/cpiData');
        //     setCpiData(data);
        // };
        // getCpiData();
        updateRankings()


    }, []);

    cpiData.map(data => {
        console.log(data)
    })

    // useEffect(() => {
    //     const getLeagueMembers = async () => {
    //         const { data } = await axios.get('/api/leagueMembers');
    //         setLeagueMembers(data);
    //     };

    //     getLeagueMembers()
    // }, []);


    const [currentIndex, setCurrentIndex] = useState([]);

    const leagueId = '990427440436625408';
    const updateRankings = async () => {
        const nflStateUrl = 'https://api.sleeper.app/v1/state/nfl';
        const usersUrl = 'https://api.sleeper.app/v1/league/'+leagueId+'/users';
        const rostersUrl = 'https://api.sleeper.app/v1/league/'+leagueId+'/rosters';
        const cpiUrl = '/api/cpiData';

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
                    console.log(currentWeek, users)
                    // postData(currentWeek, users);
                }
            })
        );
    };

    // const fetchRankings = async () => {
    //     const nflStateUrl = 'https://api.sleeper.app/v1/state/nfl';
    //     const cpiUrl = '/api/cpiData';
    
    //     const getNflState = axios.get(nflStateUrl);
    //     const getCpi = axios.get(cpiUrl);

    //     await axios.all([getNflState, getCpi]).then(
    //         axios.spread((...responses) => {
    //             const cpiData = responses[1].data;
    //             const rankingData = cpiData[cpiData.length-1];
    //             setCurrentIndex(rankingData.data.sort((a,b) => b.settings.cpiRating - a.settings.cpiRating));                
    //         }),
    //     );
    // }

    // useEffect(() => {
    //     updateRankings();
    //     fetchRankings();
    // }, []);

    // const postData = async (currentWeek, data) => {
    //     await axios.post("/api/cpiData", {
    //         week: currentWeek,
    //         data: data
    //     });
    // };

    return (
        <div className="table-container">
            <table className="myTable">
                <caption>Conors Power Index</caption>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {currentIndex.map(team => (
                        <tr key={team.user_id}>
                            <td data-cell="Team">
                                <div className="team-display flexHorizontal">
                                    {team.metadata.avatar && <div className="avatar"><img src={team.metadata.avatar} alt="" width="50" height="50"/></div>}
                                    {!team.metadata.avatar &&<div className="avatar"><img src={team.avatar_link} alt="" width="50" height="50"/></div>}
                                    <div className="ml_1">
                                        <div>{team.metadata.team_name}</div>
                                        <div className="subText">({team.display_name})</div>
                                    </div>
                                </div>
                            </td>
                            <td data-cell="Power Index">{team.settings.cpiRating}</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    )
}

export default ConorsPowerIndex;