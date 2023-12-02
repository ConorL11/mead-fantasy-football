function AveragePoints(sleeperScores){
    const teams = sleeperScores.sleeperScores;
    teams.sort((a,b) => b.settings.average_points - a.settings.average_points);

    const maxAveragePoints = Math.max(...teams.map(team => team.settings.average_points));

    return(
        <div className="averagePointsContainer">
            <h1>Average Weekly Points</h1>
            <h3>{maxAveragePoints}</h3>
            {teams.map(team => (
                <div key={team.user_id} className="teamBar">
                     <div className="teamName">{team.display_name}</div>
                     <div className="flexHorizontal">
                        {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                        {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                        <div className={`coloredBar`} style={{ width: `${(team.settings.average_points / maxAveragePoints) * 90 }%` }}>
                            <div className="teamPoints">{team.settings.average_points.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AveragePoints;