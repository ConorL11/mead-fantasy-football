import { useState, useEffect } from "react";
import axios from "axios";

function CPIRankings(){
    const [currentIndex, setCurrentIndex] = useState([]);
    const fetchRankings = async () => {
        const rankingData = await axios.get('/api/cpiData/1');
        setCurrentIndex(rankingData.data.sort((a,b) => b.settings.cpiRating - a.settings.cpiRating));
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    return(
        <div className="table-container">
            <table className="myTable">
                <caption>Conors Power Index</caption>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    )
}

export default CPIRankings;