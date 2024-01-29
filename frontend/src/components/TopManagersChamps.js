
function TopManagersChamps({members: managers}){

    managers = managers.filter(manager => manager.active);

    const maxChampionships = Math.max(...managers.map(manager => manager.championships));
    const maxBiggestLosers = Math.max(...managers.map(manager => manager.biggestLosers));

    return(
        <div className="= insightContainer">
            <h1>Champs and Biggest Losers</h1>
            <div className="champsContainer">
                <div className="">
                    <h2>Championships</h2>
                        <div>
                            {managers.sort((a,b) => b.championships - a.championships).map(manager => (
                                <div key={manager.user_id} className="teamBar">
                                    <div className="teamName">{manager.user_name}</div>
                                    <div className="flexHorizontal">
                                        <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
                                        <div className={`coloredBar coolBar`} style={{ width: `${(manager.championships / maxChampionships) * 100 }%` }}>
                                            <div className="teamPoints">{manager.championships}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="">
                    <h2>Biggest Losers</h2>
                        <div>
                            {managers.sort((a,b) => b.biggestLosers - a.biggestLosers).map(manager => (
                                <div key={manager.user_id} className="teamBar">
                                    <div className="teamName">{manager.user_name}</div>
                                    <div className="flexHorizontal">
                                        <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
                                        <div className={`coloredBar coolBar`} style={{ width: `${(manager.biggestLosers / maxBiggestLosers) * 100 }%` }}>
                                            <div className="teamPoints">{manager.biggestLosers}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> 
                </div>
            </div>
        </div>
    )
}

export default TopManagersChamps;