import { censorContent } from "../../content/constants"
function SeasonsLogPlayoffSeeds({manager}){

    const maxPlayoffSeed = 10; // hardcoding to 10 since we always have 10 players

    return(
        <div className="insightContainer">
            <h1>Playoff Seeds</h1>
            {manager.seasons.map(season => (
                <div key={season.year} className="teamBar">
                    <div className="">
                        <div className="teamName teamNameGrid">
                            <div className="noTextBreak">
                                {censorContent ?  "": season.team.teamName }
                            </div>                        
                        </div>
                        <div className="flexHorizontal">
                        <div className="seasonIndicator"> {season.year}</div>
                            <div className={`coloredBar coolBar`} style={{ width: `${((maxPlayoffSeed - season.team.summary.regularSeason.playoffSeed) / (maxPlayoffSeed)) * 75 + 20 }%` }}>
                                <div className="teamPoints">{season.team.summary.regularSeason.playoffSeed}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default SeasonsLogPlayoffSeeds