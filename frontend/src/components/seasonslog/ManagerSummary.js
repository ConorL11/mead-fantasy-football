import Avatar from "../Avatar";

function ManagerSummary({ manager }){


    console.log(manager)

    return (
        <div className="insightContainer">
            <Avatar manager={manager}/>
            <h1>{manager.user_name}</h1>
            <div>Seasons: {manager.seasons.length}</div>
            <div>Championships: {manager.summary.championships}</div>
            <div>Runner Ups: {manager.summary.runnerUp}</div>
            <div>Biggest Losers: {manager.summary.biggestLosers}</div>
            <div>Record: {manager.summary.wins} - {manager.summary.losses}</div>


            <div>Points: {manager.summary.points}</div>
            <div>Points Against: {manager.summary.pointsAgainst}</div>

        </div>
    )
}

export default ManagerSummary;