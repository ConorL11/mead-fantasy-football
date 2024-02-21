
function TopManagersActivity({members: managers}){

    managers = managers.filter(manager => manager.active);
    console.log(managers)


    for(const manager of managers){
        manager.averageAdds = manager.adds / manager.seasons;
        manager.averageTrades = manager.trades / manager.seasons;
    }

    const maxTrades = Math.max(...managers.map(manager => manager.averageTrades));
    const maxAdds = Math.max(...managers.map(manager => manager.averageAdds));

    return(
        <div className="insightContainer">
            <h1>Manager Activity</h1>
            <div className="splitInsight">
                <div className="pickupsContainer">
                    <h2>Average Pickups</h2>
                    <div>
                        {managers.sort((a,b) => b.averageAdds - a.averageAdds).map(manager => (
                            <div key={manager.user_id} className="teamBar">
                                <div className="teamName">{manager.user_name}</div>
                                <div className="flexHorizontal">
                                    <div ><img className="mediumAvatar" src={`/headshots/${manager.user_id}.png`} alt="" /></div>
                                    <div className={`coloredBar coolBar`} style={{ width: `${(manager.averageAdds / maxAdds) * 100 }%` }}>
                                        <div className="teamPoints">{manager.averageAdds.toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
                <div className="tradesContainer">
                    <h2>Average Trades</h2>
                    <div>
                        {managers.sort((a,b) => b.averageTrades - a.averageTrades).map(manager => (
                            <div key={manager.user_id} className="teamBar">
                                <div className="teamName">{manager.user_name}</div>
                                <div className="flexHorizontal">
                                    <div ><img className="mediumAvatar" src={`/headshots/${manager.user_id}.png`} alt="" /></div>
                                    <div className={`coloredBar coolBar`} style={{ width: `${(manager.averageTrades / maxTrades) * 100 }%` }}>
                                        <div className="teamPoints">{manager.averageTrades.toFixed(1)}</div>
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

export default TopManagersActivity