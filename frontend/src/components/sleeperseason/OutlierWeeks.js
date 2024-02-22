function OutlierWeeks(props){

    const teams = props.teams;
    const censorContent = props.censorContent;

    for(const team of teams){
        team.bestWeek = Math.max(...team.weeklyPointsFor.map(week => week.points));
        team.worstWeek = Math.min(...team.weeklyPointsFor.map(week => week.points));
    }

    const maxBestWeek = Math.max(...teams.map(team => team.bestWeek));
    const maxWorstWeek = Math.max(...teams.map(team => team.worstWeek));


    return(
        <div className="outlierWeeksContainer insightContainer">
            <h1>Best and Worst Weeks</h1>
            <div className="bestWeekContainer">
                <h2>Best Week</h2>
                {censorContent ? 
                    <div>
                        {teams.sort((a,b) => b.bestWeek - a.bestWeek).map(team => (
                            <div key={team.user_id} className="teamBar">
                                <div className="teamName">{team.user_name}</div>
                                <div className="flexHorizontal">
                                    <div ><img className="mediumAvatar" src={`/headshots/${team.member_id}.png`} alt="" /></div>
                                    <div className={`coloredBar coolBar`} style={{ width: `${(team.bestWeek / maxBestWeek) * 80 }%` }}>
                                        <div className="teamPoints">{team.bestWeek}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : 
                    <div>
                        {teams.sort((a,b) => b.bestWeek - a.bestWeek).map(team => (
                            <div key={team.user_id} className="teamBar">
                                <div className="teamName">{team.nickname}</div>
                                <div className="flexHorizontal">
                                    {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                                    {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                                    <div className={`coloredBar coolBar`} style={{ width: `${(team.bestWeek / maxBestWeek) * 80 }%` }}>
                                        <div className="teamPoints">{team.bestWeek}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="worstWeekContainer">
                <h2>Worst Week</h2>
                {censorContent ? 
                    <div>
                        {teams.sort((a,b) => b.worstWeek - a.worstWeek).map(team => (
                            <div key={team.user_id} className="teamBar">
                                <div className="teamName">{team.user_name}</div>
                                <div className="flexHorizontal">
                                    <div ><img className="mediumAvatar" src={`/headshots/${team.member_id}.png`} alt="" /></div>
                                    <div className={`coloredBar warmBar`} style={{ width: `${(team.worstWeek / maxWorstWeek) * 75 }%` }}>
                                        <div className="teamPoints">{team.worstWeek}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : 
                    <div>
                        {teams.sort((a,b) => b.worstWeek - a.worstWeek).map(team => (
                            <div key={team.user_id} className="teamBar">
                                <div className="teamName">{team.nickname}</div>
                                <div className="flexHorizontal">
                                    {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                                    {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                                    <div className={`coloredBar warmBar`} style={{ width: `${(team.worstWeek / maxWorstWeek) * 75 }%` }}>
                                        <div className="teamPoints">{team.worstWeek}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default OutlierWeeks;