import Avatar from "../Avatar";

function ManagerCompDisplay({ managers }){
    
    const [manager1, manager2] = managers;

    return (
        <div className="comparisonContainer insightContainer">
            <div className="comparisonHeader">
                <div className="flexHorizontal">
                    <div className="pr_1">
                        <Avatar manager={manager1} size="mediumAvatar"/>
                    </div>
                    <h2>{manager1.user_name.split(' ')[0]}</h2>
                </div>
                <div className="flexHorizontal">
                    <h2 className="pr_1">{manager2.user_name.split(' ')[0]}</h2>
                    <Avatar manager={manager2} size="mediumAvatar"/>
                </div>            
            </div>
            <h2 className="justifyCenter textCenter">Head to Head</h2>
            <div className="comparisonSection">
                <div>
                    {manager1.headToHeadSummary.wins}
                </div>
                <div className="flexHorizontal">
                    <span className={`${manager1.headToHeadSummary.wins > manager2.headToHeadSummary.wins ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Wins</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.headToHeadSummary.wins > manager1.headToHeadSummary.wins ? 'triangleRight' : ''}`}></span>
                </div>
                <div className="justifyEnd">
                    {manager2.headToHeadSummary.wins}
                </div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.points.toFixed(2)}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.headToHeadSummary.points > manager2.headToHeadSummary.points ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Points</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.headToHeadSummary.points > manager1.headToHeadSummary.points ? 'triangleRight' : ''}`}></span>
                </div>               
                <div className="justifyEnd">{manager2.headToHeadSummary.points.toFixed(2)}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.playoffWins}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.headToHeadSummary.playoffWins > manager2.headToHeadSummary.playoffWins ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Playoff Wins</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.headToHeadSummary.playoffWins > manager1.headToHeadSummary.playoffWins ? 'triangleRight' : ''}`}></span>
                </div>           
                <div className="justifyEnd">{manager2.headToHeadSummary.playoffWins}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.playoffPoints.toFixed(2)}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.headToHeadSummary.playoffPoints > manager2.headToHeadSummary.playoffPoints ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Playoff Points</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.headToHeadSummary.playoffPoints > manager1.headToHeadSummary.playoffPoints ? 'triangleRight' : ''}`}></span>
                </div>                          
                 <div className="justifyEnd">{manager2.headToHeadSummary.playoffPoints.toFixed(2)}</div>
            </div>

            <h2 className="justifyCenter textCenter">Overall Stats</h2>
            <div className="comparisonSection">
                <div>{manager1.summary.championships}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.summary.championships > manager2.summary.championships ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Championships</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.summary.championships > manager1.summary.championships ? 'triangleRight' : ''}`}></span>
                </div> 
                <div className="justifyEnd">{manager2.summary.championships}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.summary.runnerUps}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.summary.runnerUps > manager2.summary.runnerUps ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Runner Ups</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.summary.runnerUps > manager1.summary.runnerUps ? 'triangleRight' : ''}`}></span>
                </div>                 
                <div className="justifyEnd">{manager2.summary.runnerUps}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.summary.biggestLosers}</div>
                <div className="flexHorizontal">
                    <span className={`${manager1.summary.biggestLosers < manager2.summary.biggestLosers ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Biggest Losers</div>
                <div className="flexHorizontal">
                    <span className={`${manager2.summary.biggestLosers < manager1.summary.biggestLosers ? 'triangleRight' : ''}`}></span>
                </div>                        
                <div className="justifyEnd">{manager2.summary.biggestLosers}</div>
            </div>
            <div className="comparisonSection">
                <div>{(manager1.summary.wins / manager1.summary.games).toFixed(3)}</div>
                <div className="flexHorizontal">
                    <span className={`${(manager1.summary.wins / manager1.summary.games).toFixed(3) > (manager2.summary.wins / manager2.summary.games).toFixed(3) ? 'triangleLeft' : ''}`}></span>
                </div>
                <div className="justifyCenter textCenter">Win Percentage</div>
                <div className="flexHorizontal">
                    <span className={`${(manager2.summary.wins / manager2.summary.games).toFixed(3) > (manager1.summary.wins / manager1.summary.games).toFixed(3) ? 'triangleRight' : ''}`}></span>
                </div>                     
                <div className="justifyEnd">{(manager2.summary.wins / manager2.summary.games).toFixed(3)}</div>
            </div>

        </div>
    )
}

export default ManagerCompDisplay;