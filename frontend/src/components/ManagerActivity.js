function ManagerActivity(props){

    const teams = props.users;
    const maxTrades = Math.max(...teams.map(team => team.trades));
    const maxPickups = Math.max(...teams.map(team => team.adds));

    return(
        <div className="managerActivityContainer">
            <h1>Manager Activity</h1>
            <div className="pickupsContainer">
                <h2>Pickups</h2>
                {teams.sort((a,b) => b.adds - a.adds).map(team => (
                    <div key={team.user_id} className="teamBar">
                        <div className="teamName">{team.nickname}</div>
                        <div className="flexHorizontal">
                            {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                            {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                            <div className={`coloredBar coolBar`} style={{ width: `${(team.adds / maxPickups) * 100 }%` }}>
                                <div className="teamPoints">{team.adds.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="tradesContainer">
                <h2>Trades</h2>
                {teams.sort((a,b) => b.trades - a.trades).map(team => (
                    <div key={team.user_id} className="teamBar">
                        <div className="teamName">{team.nickname}</div>
                        <div className="flexHorizontal">
                            {team.metadata.avatar && <img className="mediumAvatar" src={team.metadata.avatar} alt="" width="100" height="100"/>}
                            {!team.metadata.avatar && <img className="mediumAvatar" src={team.avatar_link} alt="" width="100" height="100"/>}
                            <div className={`coloredBar coolBar`} style={{ width: `${(team.trades / maxTrades) * 100 }%` }}>
                                <div className="teamPoints">{team.trades.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManagerActivity;