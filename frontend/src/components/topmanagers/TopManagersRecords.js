
function TopManagersRecords({members: managers}){

    managers = managers.filter(manager => manager.active);
    managers.sort((a,b)=> b.wins - a.wins);

    const maxWins = Math.max(...managers.map(manager => manager.wins));

    return(
        <div className="insightContainer">
            <h1>Overall Records</h1>
            {managers.map(manager => (
                <div key={manager.user_id} className="teamBar">
                    <div className="">
                        <div className="teamName teamNameGrid">
                            <div className="noTextBreak">{manager.user_name}</div>
                        </div>
                        <div className="flexHorizontal">
                            <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
                            <div className={`coloredBar coolBar`} style={{ width: `${(manager.wins / maxWins) * 90 }%` }}>
                                <div className="teamPoints">{manager.wins} - {manager.losses}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default TopManagersRecords;