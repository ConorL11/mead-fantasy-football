function LuckRating(props){
    const teams = props.teams;
    const censorContent = props.censorContent;

    teams.sort((a,b) => b.luckRating - a.luckRating);
    const maxLuckRating = Math.max(...teams.map(team => team.luckRating));

    return(
        <div className="luckRatingContainer insightContainer">
            <h1>Luck Rating</h1>
            <h3>Calculated based on Expected Wins vs Actual Wins</h3>
            {censorContent ? 
                <div>
                    {teams.map(team => (
                        <div key={team.user_id} className="teamLuckContainer">
                            {team.luckRating < 0 && <div className="negativeLuckTeamName">{team.user_name}</div>}
                            {team.luckRating < 0 && <div className="negativeLuckContainer">
                                <div className="negativeLuckBar" style={{ width: `${(Math.abs(team.luckRating) / maxLuckRating) * 100 }%` }}>
                                    <div className="negativeLuckTeamPoints">{team.luckRating.toFixed(2)}</div>
                                </div>
                            </div>}
                            <img className="luckAvatar mediumAvatar" src={`/headshots/${team.member_id}.png`} alt="" />
                            {team.luckRating >= 0 && <div className="positiveLuckTeamName">{team.user_name}</div>}
                            {team.luckRating >= 0 && <div className="positiveLuckContainer">
                                <div className="positiveLuckBar" style={{ width: `${(Math.abs(team.luckRating) / maxLuckRating) * 100 }%` }}>
                                    <div className="positiveLuckTeamPoints">{team.luckRating.toFixed(1)}</div>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div> : 
                <div>
                    {teams.map(team => (
                        <div key={team.user_id} className="teamLuckContainer">
                            {team.luckRating < 0 && <div className="negativeLuckTeamName">{team.nickname}</div>}
                            {team.luckRating < 0 && <div className="negativeLuckContainer">
                                <div className="negativeLuckBar" style={{ width: `${(Math.abs(team.luckRating) / maxLuckRating) * 100 }%` }}>
                                    <div className="negativeLuckTeamPoints">{team.luckRating.toFixed(2)}</div>
                                </div>
                            </div>}
                            {team.metadata.avatar && <img className="luckAvatar mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                            {!team.metadata.avatar && <img className="luckAvatar mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                            {team.luckRating >= 0 && <div className="positiveLuckTeamName">{team.nickname}</div>}
                            {team.luckRating >= 0 && <div className="positiveLuckContainer">
                                <div className="positiveLuckBar" style={{ width: `${(Math.abs(team.luckRating) / maxLuckRating) * 100 }%` }}>
                                    <div className="positiveLuckTeamPoints">{team.luckRating.toFixed(1)}</div>
                                </div>                    
                            </div>}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default LuckRating;