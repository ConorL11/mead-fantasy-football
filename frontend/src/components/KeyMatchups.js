function KeyMatchups(props){

    let closeGames = props.closeGames;
    let blowoutGames = props.blowoutGames;
    const teams = props.sleeperScores;

    // Create User Map
    let rosterIdMap = {};
    for(const user of teams){
        rosterIdMap[user.roster_id] = user;
    }

    return(
        <div className="keyMatchupsContainer">
            <div>
                <h1>Closest Games</h1>
                {closeGames.map(game => (
                    <div key={game.key} className="matchupContainer mt_2">
                        <div className="matchupWeek">
                            <div className="shiftDown">Week {game.week}</div>
                        </div>
                        <div className="matchupSpread">
                            <div className="shiftDown heavy_font">{game.differential}</div>
                        </div>
                        <div className={`team1Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points > rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'heavy_font' : ''}`}>
                            <div className="matchupTeam1Name">
                                <div className="teamName1Text">{rosterIdMap[game.player1].nickname}</div>
                            </div>
                            <div className="flexHorizontal">
                                {rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].avatar_link} alt="" width="100" height="100"/>}
                                <div className={`matchupBar player1Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points > rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'winningBar' : 'losingBar'}`}>
                                    <div className="mr_4">{rosterIdMap[game.player1].weeklyPointsFor[game.week-1].points}</div>
                                </div>   
                            </div>
                        </div>
                        <div className="vsContainer">
                            <div className="vsBubble"></div> 
                            <div className="vsText">VS</div> 
                        </div>
                        <div className={`team2Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points < rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'heavy_font' : ''}`}>
                            <div className="matchupTeam2Name">
                                <div className="teamName2Text">{rosterIdMap[game.player2].nickname}</div>
                            </div>
                            <div className="flexHorizontal">
                                <div className={`matchupBar player2Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points < rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'winningBar' : 'losingBar'}`}>
                                    <div className="ml_4">{rosterIdMap[game.player2].weeklyPointsFor[game.week-1].points}</div>
                                </div>   
                                {rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player2].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player2].avatar_link} alt="" width="100" height="100"/>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h1>Biggest Blowouts</h1>
                {blowoutGames.map(game => (
                    <div key={game.key} className="matchupContainer mt_2">
                        <div className="matchupWeek">
                            <div className="shiftDown">Week {game.week}</div>
                        </div>
                        <div className="matchupSpread">
                            <div className="shiftDown heavy_font">{game.differential}</div>
                        </div>
                        <div className={`team1Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points > rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'heavy_font' : ''}`}>
                            <div className="matchupTeam1Name">
                                <div className="teamName1Text">{rosterIdMap[game.player1].nickname}</div>
                            </div>
                            <div className="flexHorizontal">
                                {rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player1].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player1].avatar_link} alt="" width="100" height="100"/>}
                                <div className={`matchupBar player1Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points > rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'winningBar' : 'losingBar'}`}>
                                    <div className="mr_4">{rosterIdMap[game.player1].weeklyPointsFor[game.week-1].points}</div>
                                </div>   
                            </div>
                        </div>
                        <div className="vsContainer">
                            <div className="vsBubble"></div> 
                            <div className="vsText">VS</div> 
                        </div>
                        <div className={`team2Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points < rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'heavy_font' : ''}`}>
                            <div className="matchupTeam2Name">
                                <div className="teamName2Text">{rosterIdMap[game.player2].nickname}</div>
                            </div>
                            <div className="flexHorizontal">
                                <div className={`matchupBar player2Bar ${rosterIdMap[game.player1].weeklyPointsFor[game.week - 1].points < rosterIdMap[game.player2].weeklyPointsFor[game.week - 1].points ? 'winningBar' : 'losingBar'}`}>
                                    <div className="ml_4">{rosterIdMap[game.player2].weeklyPointsFor[game.week-1].points}</div>
                                </div>   
                                {rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player2].metadata.avatar} alt="" width="100" height="100"/>}
                                {!rosterIdMap[game.player2].metadata.avatar && <img className="mediumAvatar" src={rosterIdMap[game.player2].avatar_link} alt="" width="100" height="100"/>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KeyMatchups;