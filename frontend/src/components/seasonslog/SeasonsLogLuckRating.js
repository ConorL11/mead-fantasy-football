import { censorContent } from "../../content/constants"
function SeasonsLogLuckRating({manager}){

    for(const season of manager.seasons){
        season.team.summary.regularSeason.luckRating = (season.team.summary.regularSeason.expectedWins - season.team.summary.regularSeason.wins);
    }

    const maxLuckRating = Math.max(...manager.seasons.map(season => season.team.summary.regularSeason.luckRating));

    return(
        <div className="insightContainer">
            <h1>Luck Rating</h1>
            <h3>Calculated based on Expected Wins vs Actual Wins</h3>
            {manager.seasons.map(season => (
                <div key={season.year} className="teamLuckContainer">
                    {/* {season.team.summary.regularSeason.luckRating < 0 && <div className="negativeLuckTeamName">{}</div>} */}
                    {season.team.summary.regularSeason.luckRating < 0 && <div className="negativeLuckContainer">
                        <div className="negativeLuckBar" style={{ width: `${(Math.abs(season.team.summary.regularSeason.luckRating) / maxLuckRating) * 100 }%` }}>
                            <div className="negativeLuckTeamPoints">{season.team.summary.regularSeason.luckRating.toFixed(2)}</div>
                        </div>
                    </div>}
                    <div className="seasonIndicator luckAvatar"> {season.year}</div>
                    {/* {season.team.summary.regularSeason.luckRating >= 0 && <div className="positiveLuckTeamName">{}</div>} */}
                    {season.team.summary.regularSeason.luckRating >= 0 && <div className="positiveLuckContainer">
                        <div className="positiveLuckBar" style={{ width: `${(Math.abs(season.team.summary.regularSeason.luckRating) / maxLuckRating) * 100 }%` }}>
                            <div className="positiveLuckTeamPoints">{season.team.summary.regularSeason.luckRating.toFixed(1)}</div>
                        </div>
                    </div>}
                </div>
            ))}
        </div>
    )
}

export default SeasonsLogLuckRating;