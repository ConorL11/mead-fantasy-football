function KeyMatchups(props){

    let closeGames = props.closeGames;
    let blowoutGames = props.blowoutGames;
    const teams = props.sleeperScores;

    // Create User Map
    let rosterIdMap = {};
    for(const user of teams){
        rosterIdMap[user.roster_id] = user;
    }


    // console.log("teams", teams) 
    // console.log("rosterIdMap", rosterIdMap) 

    // console.log("blowoutGames", blowoutGames)
    // console.log("closeGames", closeGames)

    return(
        <div className="keyMatchupsContainer">
            <div>
                <h1>Closest Games</h1>
                {closeGames.map(game => (
                    <div key={game.key} className="flexHorizontal m1">
                        <div className="flexHorizontal">
                            {rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].metadata.avatar} alt="" width="100" height="100"/>}
                            {!rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].avatar_link} alt="" width="100" height="100"/>}
                            <div className="ml_1">{rosterIdMap[game.player1].nickname} </div>
                            <div className="ml_1">{rosterIdMap[game.player1].weeklyPointsFor[game.week-1].points} </div>
                        </div>
                        <div className="ml_1"> VS. </div>
                        <div className="flexHorizontal ml_1">
                            <div>{rosterIdMap[game.player2].weeklyPointsFor[game.week-1].points} </div>
                            <div className="ml_1">{rosterIdMap[game.player2].nickname} </div>
                                {rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar ml_1" src={rosterIdMap[game.player2].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar ml_1" src={rosterIdMap[game.player2].avatar_link} alt="" width="100" height="100"/>}
                        </div>
                        {/* <div className="teamName">{game.differential}</div> */}
                    </div>
                ))}
            </div>
            <div>
                <h1>Biggest Blowouts</h1>
                {blowoutGames.map(game => (
                    <div key={game.key} className="flexHorizontal m1">
                        <div className="flexHorizontal">
                            {rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].metadata.avatar} alt="" width="100" height="100"/>}
                            {!rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].avatar_link} alt="" width="100" height="100"/>}
                            <div className="ml_1">{rosterIdMap[game.player1].nickname} </div>
                            <div className="ml_1">{rosterIdMap[game.player1].weeklyPointsFor[game.week-1].points} </div>
                        </div>
                        <div className="ml_1"> VS. </div>
                        <div className="flexHorizontal ml_1">
                            <div>{rosterIdMap[game.player2].weeklyPointsFor[game.week-1].points} </div>
                            <div className="ml_1">{rosterIdMap[game.player2].nickname} </div>
                                {rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar ml_1" src={rosterIdMap[game.player2].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar ml_1" src={rosterIdMap[game.player2].avatar_link} alt="" width="100" height="100"/>}
                        </div>
                        {/* <div className="teamName">{game.differential}</div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KeyMatchups;