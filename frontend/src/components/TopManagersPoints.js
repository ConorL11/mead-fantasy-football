function TopManagersPoints({members: managers}){

    managers = managers.filter(manager => manager.active);

    managers.sort((a,b) => b.points - a.points);
    const maxPoints = Math.max(...managers.map(manager => manager.points));

    return(
        <div className="averagePointsContainer insightContainer">
            <h1>Total Points</h1>
            {managers.map(manager => (
                <div key={manager.user_id} className="teamBar">
                    <div>
                        <div className="teamName teamNameGrid">
                            <div className="noTextBreak">{manager.user_name}</div>
                            <div className="pl_2">{manager.games} Games</div>
                        </div>
                        <div className="flexHorizontal">
                            <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
                            <div className={`coloredBar coolBar`} style={{ width: `${(manager.points / maxPoints) * 90 }%` }}>
                                <div className="teamPoints">{manager.points.toFixed(1)}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default TopManagersPoints;