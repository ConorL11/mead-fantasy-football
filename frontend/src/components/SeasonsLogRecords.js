function SeasonsLogRecords({manager}){

    for(const season of manager.seasons){
        season.team.summary.regularSeason.averagePoints = (season.team.summary.regularSeason.points / (season.team.summary.regularSeason.wins + season.team.summary.regularSeason.losses));
    }
    const maxWins = Math.max(...manager.seasons.map(season => season.team.summary.regularSeason.wins));

    return(
        <div className="insightContainer">
            <h1>Overall Records</h1>
            {manager.seasons.map(season => (
                <div key={season.year} className="teamBar">
                    <div className="">
                        <div className="teamName teamNameGrid">
                            <div className="noTextBreak">{season.team.teamName}</div>
                        </div>
                        <div className="flexHorizontal">
                            <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
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