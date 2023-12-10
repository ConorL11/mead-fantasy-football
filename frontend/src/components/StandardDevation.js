function StandardDeviation(sleeperScores){
    const teams = sleeperScores.sleeperScores;
    teams.sort((a,b) => b.settings.standard_deviation - a.settings.standard_deviation);
    const maxStandardDeviation = Math.max(...teams.map(team => team.settings.standard_deviation));

    const half = Math.ceil(teams.length / 2);
    const inconsistentTeams = teams.slice(0,half);
    const consistentTeams = teams.slice(half);

    consistentTeams.sort((a,b) => a.settings.standard_deviation - b.settings.standard_deviation);

    return(
        <div className="standardDeviationContainer">
            <div>
                <h1>High Variance Teams</h1>
                <h3>Based on Standard Deviation</h3>
                {inconsistentTeams.map(team => (
                    <div key={team.user_id} className="teamBar">
                        <div className="teamName">{team.nickname}</div>
                        <div className="flexHorizontal">
                            {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                            {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                            <div className={`coloredBar warmBar`} style={{ width: `${(team.settings.standard_deviation / maxStandardDeviation) * 75 }%` }}>
                                <div className="teamPoints">{team.settings.standard_deviation.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
            <div>
                <h1>Most Consistent Teams</h1>
                <h3>Based on Standard Deviation</h3>
                {consistentTeams.map(team => (
                    <div key={team.user_id} className="teamBar">
                        <div className="teamName">{team.nickname}</div>
                        <div className="flexHorizontal">
                            {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                            {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                            <div className={`coloredBar coolBar`} style={{ width: `${(team.settings.standard_deviation / maxStandardDeviation) * 75 }%` }}>
                                <div className="teamPoints">{team.settings.standard_deviation.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StandardDeviation;