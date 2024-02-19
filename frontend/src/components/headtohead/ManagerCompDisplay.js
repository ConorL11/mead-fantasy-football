import Avatar from "../Avatar";

function ManagerCompDisplay({ managers }){
    
    console.log("managers", managers)
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
                <div>
                    <span className={`${manager1.headToHeadSummary.wins > manager2.headToHeadSummary.wins ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Wins</div>
                <div>
                    <span className={`${manager2.headToHeadSummary.wins > manager1.headToHeadSummary.wins ? '' : 'displayNone'}`}>&#9654;</span>
                </div>
                <div className="justifyEnd">
                    {manager2.headToHeadSummary.wins}
                </div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.points.toFixed(2)}</div>
                <div>
                    <span className={`${manager1.headToHeadSummary.points > manager2.headToHeadSummary.points ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Points</div>
                <div>
                    <span className={`${manager2.headToHeadSummary.points > manager1.headToHeadSummary.points ? '' : 'displayNone'}`}>&#9654;</span>
                </div>               
                <div className="justifyEnd">{manager2.headToHeadSummary.points.toFixed(2)}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.playoffWins}</div>
                <div>
                    <span className={`${manager1.headToHeadSummary.playoffWins > manager2.headToHeadSummary.playoffWins ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Playoff Wins</div>
                <div>
                    <span className={`${manager2.headToHeadSummary.playoffWins > manager1.headToHeadSummary.playoffWins ? '' : 'displayNone'}`}>&#9654;</span>
                </div>           
                <div className="justifyEnd">{manager2.headToHeadSummary.playoffWins}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.headToHeadSummary.playoffPoints.toFixed(2)}</div>
                <div>
                    <span className={`${manager1.headToHeadSummary.playoffPoints > manager2.headToHeadSummary.playoffPoints ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Playoff Points</div>
                <div>
                    <span className={`${manager2.headToHeadSummary.playoffPoints > manager1.headToHeadSummary.playoffPoints ? '' : 'displayNone'}`}>&#9654;</span>
                </div>                          
                 <div className="justifyEnd">{manager2.headToHeadSummary.playoffPoints.toFixed(2)}</div>
            </div>

            <h2 className="justifyCenter textCenter">Overall Stats</h2>
            <div className="comparisonSection">
                <div>{manager1.summary.championships}</div>
                <div>
                    <span className={`${manager1.summary.championships > manager2.summary.championships ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Championships</div>
                <div>
                    <span className={`${manager2.summary.championships > manager1.summary.championships ? '' : 'displayNone'}`}>&#9654;</span>
                </div> 
                <div className="justifyEnd">{manager2.summary.championships}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.summary.runnerUps}</div>
                <div>
                    <span className={`${manager1.summary.runnerUps > manager2.summary.runnerUps ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Runner Ups</div>
                <div>
                    <span className={`${manager2.summary.runnerUps > manager1.summary.runnerUps ? '' : 'displayNone'}`}>&#9654;</span>
                </div>                 
                <div className="justifyEnd">{manager2.summary.runnerUps}</div>
            </div>
            <div className="comparisonSection">
                <div>{manager1.summary.biggestLosers}</div>
                <div>
                    <span className={`${manager1.summary.biggestLosers < manager2.summary.biggestLosers ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Biggest Losers</div>
                <div>
                    <span className={`${manager2.summary.biggestLosers < manager1.summary.biggestLosers ? '' : 'displayNone'}`}>&#9654;</span>
                </div>                        
                <div className="justifyEnd">{manager2.summary.biggestLosers}</div>
            </div>
            <div className="comparisonSection">
                <div>{(manager1.summary.wins / manager1.summary.games).toFixed(3)}</div>
                <div>
                    <span className={`${(manager1.summary.wins / manager1.summary.games).toFixed(3) > (manager2.summary.wins / manager2.summary.games).toFixed(3) ? '' : 'displayNone'}`}>&#9664;</span>
                </div>
                <div className="justifyCenter textCenter">Win Percentage</div>
                <div>
                    <span className={`${(manager2.summary.wins / manager2.summary.games).toFixed(3) > (manager1.summary.wins / manager1.summary.games).toFixed(3) ? '' : 'displayNone'}`}>&#9654;</span>
                </div>                     
                <div className="justifyEnd">{(manager2.summary.wins / manager2.summary.games).toFixed(3)}</div>
            </div>

        </div>
    )
}

export default ManagerCompDisplay;