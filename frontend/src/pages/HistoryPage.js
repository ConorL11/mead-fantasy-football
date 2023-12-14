import { pastWinners } from "../content/constants";
import { useState, useEffect } from "react";
import axios from "axios";
import HistoricalData from "../components/HistoricalData"; // temp import for front end testing 

function HistoryPage() {

    const [leagueMembers, setLeagueMembers] = useState([]);

    useEffect(() => {
        const getLeagueMembers = async () => {
            const { data } = await axios.get('/api/leagueMembers');
            setLeagueMembers(data);
        };

        getLeagueMembers();
    }, []);


    return (
        <div>
            <table className="myTable">
                <caption>League History</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Champion 👑</th>
                        <th>Loser 🚽</th>
                    </tr>
                </thead>
                <tbody>
                    {pastWinners.map(year => (
                        <tr key={year.year}>
                            <td>{year.year}</td>
                            <td data-cell="Champion">{year.winningUser}</td>
                            <td data-cell="Loser">{year.losingUser}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="myTable">
                <caption>League Members</caption>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Nickname</th>
                    </tr>
                </thead>
                <tbody>
                    {leagueMembers.map(member => (
                        <tr key={member.user_id}>
                            <td>{member.user_id}</td>
                            <td>{member.user_name}</td>
                            <td>{member.user_nickname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <HistoricalData />
        </div>
    )
}

export default HistoryPage;