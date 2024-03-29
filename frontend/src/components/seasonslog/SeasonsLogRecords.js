import { censorContent } from "../../content/constants";
function SeasonsLogRecords({manager}){

    for(const season of manager.seasons){
        season.team.summary.regularSeason.averagePoints = (season.team.summary.regularSeason.points / (season.team.summary.regularSeason.wins + season.team.summary.regularSeason.losses));
    }
    const maxWins = Math.max(...manager.seasons.map(season => season.team.summary.regularSeason.wins));

    return(
        <div className="insightContainer">
            <h1>Season Records</h1>
            {manager.seasons.map(season => (
                <div key={season.year} className="teamBar">
                    <div className="">
                        <div className="teamName teamNameGrid">
                            <div className="noTextBreak">
                                {censorContent ? 
                                "": 
                                season.team.teamName 
                                }
                            </div>
                        </div>
                        <div className="flexHorizontal">
                            <div className="seasonIndicator"> {season.year}</div>
                            <div className={`coloredBar coolBar`} style={{ width: `${(season.team.summary.regularSeason.wins / maxWins) * 90 }%` }}>
                                <div className="teamPoints">{season.team.summary.regularSeason.wins} - {season.team.summary.regularSeason.losses}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default SeasonsLogRecords