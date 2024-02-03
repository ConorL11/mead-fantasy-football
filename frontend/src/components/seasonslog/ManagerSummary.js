import Avatar from "../Avatar";

function ManagerSummary({ manager }){

    return (
        <div className="insightContainer">
            <Avatar manager={manager}/>
            <h1>{manager.user_name}</h1>
            <div>Seasons: {manager.seasons.length}</div>
            <div>Championships: {manager.seasons.length}</div>
            <div>High Scorer: {manager.seasons.length}</div>
            <div>Biggest Loser: {manager.seasons.length}</div>

            <div>Points: {manager.seasons.length}</div>
            <div>Record: {manager.seasons.length}</div>
            <div>Average Playoff Seed: {manager.seasons.length}</div>
            <div>Playoff Appearances: {manager.seasons.length}</div>

            <div>Record: {manager.seasons.length}</div>
            <div>Total Points: {manager.seasons.length}</div>
        </div>
    )
}

export default ManagerSummary;