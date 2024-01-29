
function TopManagersLuckRating({members: managers, seasons}){



    console.log('seasons', seasons);
    console.log('managers', managers);


    managers = managers.filter(manager => manager.active);

    // const maxPlayoffSeed = Math.max(...managers.map(manager => manager.averagePlayoffSeed));
    return(
        <div className="insightContainer">
            <h1>Overall Luck Rating</h1>
                {/* <div>
                    {managers.sort((a,b) => a.averagePlayoffSeed - b.averagePlayoffSeed).map(manager => (
                        <div key={manager.user_id} className="teamBar">
                            <div className="teamName">{manager.user_name}</div>
                            <div className="flexHorizontal">
                                <div ><img className="mediumAvatar" src={`/headshots/${manager._id}.png`} alt="" /></div>
                                <div className={`coloredBar coolBar`} style={{ width: `${(manager.averagePlayoffSeed / maxPlayoffSeed) * 100 }%` }}>
                                    <div className="teamPoints">{manager.averagePlayoffSeed.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
        </div>
    )
}

export default TopManagersLuckRating