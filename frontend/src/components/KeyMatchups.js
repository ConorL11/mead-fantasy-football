function KeyMatchups(props){

    const closeGames = props.closeGames;
    const blowoutGames = props.blowoutGames;
    console.log(blowoutGames)
    return(
        <div className="keyMatchupsContainer">
            <div>
                <h1>Closest Games</h1>
                {closeGames.map(game => (
                    <div key={game.key} className="teamBar">
                        <div className="teamName">{game.differential}</div>
                    </div>
                ))}
            </div>
            <div>
                <h1>Biggest Blowouts</h1>
                {blowoutGames.map(game => (
                    <div key={game.key} className="">
                        <div className="teamName">{game.differential}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KeyMatchups;