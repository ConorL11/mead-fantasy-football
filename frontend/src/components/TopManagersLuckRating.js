
function TopManagersLuckRating({members: managers}){


    for(const manager of managers){
        manager.luckRating = manager.wins - manager.expectedWins;
    }

    managers.sort((a,b) => b.luckRating - a.luckRating);
    const maxLuckRating = Math.max(...managers.map(manager => manager.luckRating));

    managers = managers.filter(manager => manager.active);

    return(
        <div className="insightContainer">
            <h1>Overall Luck Rating</h1>
            <h2>Calculated based on Expected Wins vs Actual Wins</h2>
            <div>
                {managers.map(manager => (
                    <div key={manager.user_id} className="teamLuckContainer">
                        {manager.luckRating < 0 && <div className="negativeLuckTeamName">{manager.user_name}</div>}
                        {manager.luckRating < 0 && <div className="negativeLuckContainer">
                            <div className="negativeLuckBar" style={{ width: `${(Math.abs(manager.luckRating) / maxLuckRating) * 100 }%` }}>
                                <div className="negativeLuckTeamPoints">{manager.luckRating.toFixed(2)}</div>
                            </div>
                        </div>}
                        <img className="luckAvatar mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" />
                        {manager.luckRating >= 0 && <div className="positiveLuckTeamName">{manager.user_name}</div>}
                        {manager.luckRating >= 0 && <div className="positiveLuckContainer">
                            <div className="positiveLuckBar" style={{ width: `${(Math.abs(manager.luckRating) / maxLuckRating) * 100 }%` }}>
                                <div className="positiveLuckTeamPoints">{manager.luckRating.toFixed(1)}</div>
                            </div>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopManagersLuckRating