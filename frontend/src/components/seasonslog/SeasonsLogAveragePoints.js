function SeasonsLogAveragePoints({manager}){

    for(const season of manager.seasons){
        season.team.summary.regularSeason.averagePoints = (season.team.summary.regularSeason.points / (season.team.summary.regularSeason.wins + season.team.summary.regularSeason.losses));
    }
    const maxAveragePoints = Math.max(...manager.seasons.map(season => season.team.summary.regularSeason.averagePoints));

    return(
        <div className="insightContainer">
            <h1>{manager.user_name}'s Average Points</h1>
            {manager.seasons.map(season => (
                <div key={season.year} className="teamBar">
                    <div>
                        <div className="teamName">{season.team.teamName}</div>
                        <div className="flexHorizontal">
                            <div className="seasonIndicator"> {season.year}</div>
                            <div className={`coloredBar coolBar`} style={{ width: `${(season.team.summary.regularSeason.averagePoints / maxAveragePoints) * 90 }%` }}>
                                <div className="teamPoints">{season.team.summary.regularSeason.averagePoints.toFixed(1)}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default SeasonsLogAveragePoints