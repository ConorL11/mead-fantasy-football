import { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";


function Gamelog({ managers, seasons }){

    const [showPlayoffGames, setShowPlayoffGames] = useState(false);
    const [showRegularSeasonGames, setShowRegularSeasonGames] = useState(false);


    const handlePlayoffClick = () => {
        setShowPlayoffGames(!showPlayoffGames);
    }

    const handleRegularSeasonClick = () => {
        setShowRegularSeasonGames(!showRegularSeasonGames);
    }

    // get season length for playoff matchup type
    let seasonMap = {}
    for(const season of seasons){
        season.seasonLength = Math.max(...season.schedule.map(game => game.matchupPeriodId));
        seasonMap[season.season] = season;
    }

    const allMatchups = [];

    // add manager data to matchups
    for(const manager of managers){
        for (const season of manager.seasons) {
            for (const game of season.headToHeadGames) {
                game.differential = Math.abs(game.home.totalPoints - game.away.totalPoints);
                if(game.home.teamId === season.team.teamId){
                    game.home.team = {
                        user_name: manager.user_name,
                        user_nickname: manager.user_nickname,
                        id: manager.user_id
                    }
                } else {
                    game.away.team = {
                        user_name: manager.user_name,
                        user_nickname: manager.user_nickname,
                        id: manager.user_id
                    }                
                }
            }
        }
    }

    // Push all matchups into their own array
    for (const season of managers[0].seasons) {
        for (const game of season.headToHeadGames) {
            game.season = season.year;
            allMatchups.push(game);
        }
    }
    
    const regularSeasonMatchups = allMatchups.filter(game => game.matchupType === 'regularSeason');
    const playoffMatchups = allMatchups.filter(game => game.matchupType === 'playoff');

    for(const game of playoffMatchups){
        if(seasonMap[game.season].seasonLength - game.matchupPeriodId === 0){
            game.playoffMatchup = 'Championship';
        } else if (seasonMap[game.season].seasonLength - game.matchupPeriodId === 1){
            game.playoffMatchup = 'Semi-Finals';
        } else if (seasonMap[game.season].seasonLength - game.matchupPeriodId === 2){
            game.playoffMatchup = 'First Round';
        }
    }

    return(
        <div className="gameLogContainer">
            {playoffMatchups.length > 0 &&             
                <div className="insightContainer gameLogSubContainer">
                    <div className="gameLogHeader" onClick={handlePlayoffClick}>
                        <h2 >Playoff Matchups</h2>
                        <div className="flexHorizontal fontSize2em">
                            {showPlayoffGames ? <RiArrowRightSLine /> : <RiArrowDownSLine />}
                        </div>
                    </div>
                    {showPlayoffGames &&
                        <div className="gameLogBody open">
                            {playoffMatchups.map(game => (
                                <div key={`${game.season.toString() + game.id.toString()}`} className="matchupContainer mt_2">
                                    <div className="matchupWeek noTextBreak">
                                        <div className="">{game.season} {game.playoffMatchup}</div>
                                    </div>
                                    <div className={`team1Bar ${game.home.totalPoints > game.away.totalPoints ? 'heavy_font' : ''}`}>
                                        <div>
                                            <div className="matchupTeam1Name">
                                            <div className="teamName1Text"></div>
                                            </div>
                                            <div className="flexHorizontal">
                                                <div className=""><img className="mediumAvatar" src={`/headshots/${game.home.team.id}.png`} alt="" /></div>
                                                <div className={`matchupBar player1Bar ${game.home.totalPoints > game.away.totalPoints ? 'winningBar' : 'losingBar'}`}>
                                                    <div className="mr_4">{game.home.totalPoints}</div>
                                                </div>   
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="vsContainer">
                                        <div className="vsBubble"></div> 
                                        <div className="vsText">VS</div> 
                                    </div>
                                    <div className={`team2Bar ${game.home.totalPoints < game.away.totalPoints ? 'heavy_font' : ''}`}>
                                        <div>
                                            <div className="matchupTeam2Name">
                                                <div className="teamName2Text"></div>
                                            </div>
                                            <div className="flexHorizontal">
                                                <div className={`matchupBar player2Bar ${game.home.totalPoints < game.away.totalPoints ? 'winningBar' : 'losingBar'}`}>
                                                    <div className="ml_4">{game.away.totalPoints}</div>
                                                </div>   
                                                <div className=""><img className="mediumAvatar" src={`/headshots/${game.away.team.id}.png`} alt="" /></div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            ))}
                        </div> 
                    }
                </div>
            }

            <div className="insightContainer gameLogSubContainer">
                <div className="gameLogHeader" onClick={handleRegularSeasonClick}>
                    <h2 >Regular Season Matchups</h2>
                    <div className="flexHorizontal fontSize2em">
                        {showRegularSeasonGames ? <RiArrowRightSLine /> : <RiArrowDownSLine />}
                    </div>
                </div>
                {showRegularSeasonGames && 
                    <div className="gameLogBody">
                        {regularSeasonMatchups.map(game => (
                            <div key={`${game.season.toString() + game.id.toString()}`} className="matchupContainer mt_2">
                                <div className="matchupWeek noTextBreak">
                                    <div className="">{game.season} Week {game.matchupPeriodId}</div>
                                </div>
                                <div className={`team1Bar ${game.home.totalPoints > game.away.totalPoints ? 'heavy_font' : ''}`}>
                                    <div>
                                        <div className="matchupTeam1Name">
                                        <div className="teamName1Text"></div>
                                        </div>
                                        <div className="flexHorizontal">
                                            <div className=""><img className="mediumAvatar" src={`/headshots/${game.home.team.id}.png`} alt="" /></div>
                                            <div className={`matchupBar player1Bar ${game.home.totalPoints > game.away.totalPoints ? 'winningBar' : 'losingBar'}`}>
                                                <div className="mr_4">{game.home.totalPoints}</div>
                                            </div>   
                                        </div>
                                    </div> 
                                </div>
                                <div className="vsContainer">
                                    <div className="vsBubble"></div> 
                                    <div className="vsText">VS</div> 
                                </div>
                                <div className={`team2Bar ${game.home.totalPoints < game.away.totalPoints ? 'heavy_font' : ''}`}>
                                    <div>
                                        <div className="matchupTeam2Name">
                                            <div className="teamName2Text"></div>
                                        </div>
                                        <div className="flexHorizontal">
                                            <div className={`matchupBar player2Bar ${game.home.totalPoints < game.away.totalPoints ? 'winningBar' : 'losingBar'}`}>
                                                <div className="ml_4">{game.away.totalPoints}</div>
                                            </div>   
                                            <div className=""><img className="mediumAvatar" src={`/headshots/${game.away.team.id}.png`} alt="" /></div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                }         
            </div>
        </div>
    )
}

export default Gamelog;