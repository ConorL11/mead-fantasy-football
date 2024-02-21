
function TopManagersPlayoffAppearances({members: managers}){

    managers = managers.filter(manager => manager.active);

    const maxPlayoffAppearances = Math.max(...managers.map(manager => manager.seasons));
    return(
        <div className="insightContainer">
            <h1>Overall Playoff Appearances</h1>
                <div>
                    {managers.sort((a,b) => b.playoffAppearances - a.playoffAppearances).map(manager => (
                        <div key={manager.user_id} className="teamBar">
                            <div className="teamName">{manager.user_name}</div>
                            <div className="flexHorizontal">
                                <div ><img className="mediumAvatar" src={`/headshots/${manager.user_id}.png`} alt="" /></div>
                                <div className={`coloredBar coolBar`} style={{ width: `${(manager.playoffAppearances / maxPlayoffAppearances) * 100 }%` }}>
                                    <div className="teamPoints">{manager.playoffAppearances.toFixed(0)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default TopManagersPlayoffAppearances;