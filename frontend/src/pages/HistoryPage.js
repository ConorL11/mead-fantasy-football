import { pastWinners } from "../content/constants";
function HistoryPage() {

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
        </div>
    )
}

export default HistoryPage;