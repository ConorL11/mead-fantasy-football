import Avatar from "../Avatar";
import FormatNumber from "../FormatNumber";

function ManagerSummary({ manager }){

    return (
        <div className="managerSummary insightContainer">
            <div className="managerSummaryHeader">
                <Avatar manager={manager} size="largeAvatar"/>
                <h1>{manager.user_name}</h1>
            </div>
            <div className="twoColumnContainer">
                <div className="twoColumnContainer">
                    <div>
                        <div>Seasons: </div>
                        <div>Championships: </div>
                        <div>Runner Ups: </div>
                        <div>Biggest Losers: </div>
                    </div>
                    <div>
                        <div>{manager.seasons.length}</div>
                        <div>{manager.summary.championships}</div>
                        <div>{manager.summary.runnerUps}</div>
                        <div>{manager.summary.biggestLosers}</div>
                    </div>
                </div>
                <div className="twoColumnContainer">
                    <div>
                        <div>Record: </div>
                        <div className="noTextBreak">Playoffs: </div>
                        <div>Points: </div>
                        <div>Points Against: </div>
                    </div>
                    <div>
                        <div className="noTextBreak">{manager.summary.wins} - {manager.summary.losses}</div>
                        <div>{manager.summary.playoffAppearances}</div>
                        <div><FormatNumber number={manager.summary.points}/> </div>
                        <div><FormatNumber number={manager.summary.pointsAgainst}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerSummary;