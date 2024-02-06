import { censorContent } from "../../content/constants";

function SeasonsLogManagerActivity({manager}){

    const maxAdds = Math.max(...manager.seasons.map(season => season.team.transactions.adds));
    const maxTrades = Math.max(...manager.seasons.map(season => season.team.transactions.trades));

    return(
        <div className="insightContainer">
            <h1>Manager Activity</h1>
            <div className="splitInsight">
                <div className="pickupsContainer">
                    <h2>Pickups</h2>
                    <div>
                        {manager.seasons.map(season => (
                            <div key={season.year} className="teamBar">
                                <div className="teamName">
                                    <div className="noTextBreak">
                                        {censorContent ?  "": season.team.teamName }
                                    </div>    
                                </div>
                                <div className="flexHorizontal">
                                    <div className="seasonIndicator"> {season.year}</div>
                                    <div className={`coloredBar coolBar`} style={{ width: `${(season.team.transactions.adds / maxAdds) * 90 }%` }}>
                                        <div className="teamPoints">{season.team.transactions.adds}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
                <div className="tradesContainer">
                    <h2>Trades</h2>
                    <div>
                        {manager.seasons.map(season => (
                            <div key={season.year} className="teamBar">
                                <div className="teamName">
                                    <div className="noTextBreak">
                                        {censorContent ?  "": season.team.teamName }
                                    </div>    
                                </div>                                
                                <div className="flexHorizontal">
                                    <div className="seasonIndicator"> {season.year}</div>
                                    <div className={`coloredBar coolBar`} style={{ width: `${(season.team.transactions.trades / maxTrades) * 90 }%` }}>
                                        <div className="teamPoints">{season.team.transactions.trades}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default SeasonsLogManagerActivity