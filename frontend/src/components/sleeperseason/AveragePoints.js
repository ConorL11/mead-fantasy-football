
function AveragePoints(props){
    const teams = props.sleeperScores;
    const censorContent = props.censorContent;

    teams.sort((a,b) => b.settings.average_points - a.settings.average_points);
    const maxAveragePoints = Math.max(...teams.map(team => team.settings.average_points));

    return(
        <div className="averagePointsContainer insightContainer">
            <h1>Average Weekly Points</h1>
            {teams.map(team => (
                <div key={team.user_id} className="teamBar">
                    {censorContent ? 
                        <div>
                            <div className="teamName">{team.user_name}</div>
                            <div className="flexHorizontal">
                                <div ><img className="mediumAvatar" src={`/headshots/${team.member_id}.png`} alt="" /></div>
                                <div className={`coloredBar coolBar`} style={{ width: `${(team.settings.average_points / maxAveragePoints) * 90 }%` }}>
                                    <div className="teamPoints">{team.settings.average_points.toFixed(1)}</div>
                                </div>
                            </div>
                        </div> : 
                        <div>
                            <div className="teamName">{team.nickname}</div>
                            <div className="flexHorizontal">
                                {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                                {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                                <div className={`coloredBar coolBar`} style={{ width: `${(team.settings.average_points / maxAveragePoints) * 90 }%` }}>
                                    <div className="teamPoints">{team.settings.average_points.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            ))}
        </div>
    )
}

export default AveragePoints;