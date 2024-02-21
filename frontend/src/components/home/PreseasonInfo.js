import CountdownTimer from "./CountdownTimer";

function PreseasonInfo(){

    return (
        <div className="preseasonInfoContainer">
            <h2 className="preseasonHeader">NFL Preseason</h2>
            <div className="preseasonBody">
                <CountdownTimer countdownDate={'2024-09-05'} />
            </div>
        </div>
       
    )
}

export default PreseasonInfo;