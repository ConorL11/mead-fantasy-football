import { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

function BylawsPage(){
    const [showBylaws, setShowBylaws] = useState([]);
    
    const handleClick = (section) => {
        setShowBylaws((prev) => {
            if(prev.includes(section)){
                return prev.filter((prevSection) => prevSection !== section);
            } else {
                return [...prev, section]
            }
        })
    }

    return (
        <div className="bylawContainer">
            <div className="bylawSection">
                <div className="bylawHeader" onClick={() => {handleClick(2023)}}>
                    <h1> 2023 Rules</h1>
                    {showBylaws.includes(2023) ? <RiArrowRightSLine className="bigArrow"/> : <RiArrowDownSLine  className="bigArrow"/>}
                </div>
                <div className={`bylawBody ${showBylaws.includes(2023) ? 'openBylaws' : 'closeBylaws'}`}>
                    <p>Playoff Format: Top 6 overall records</p>
                    <p>Divisions: Alternating total points from last year (teams, 1,3,5,7,9 are in Division 1 and 2,4,6,8,10 in Division 2)</p>
                    <p>Last Place: Determined by lowest aggregate point total amongst teams missing the playoffs through the playoff weeks</p>
                    <p>League Expansion: Expansion passes provided the 2 people accept</p>
                    <p>Auction Waiver: Passes 6 votes for and 3 votes against</p>
                    <p>Keeper Rule: Players drafted in the 5th round or later are eligible to be kept. You can only keep players that are drafted and rostered at the end of the season. Keepers are announced ad hoc at the draft.</p>
                    <p>Trading Picks: Motion does not pass</p>
                </div>
            </div>
            <div className="bylawSection">
                <div className="bylawHeader" onClick={() => {handleClick(2022)}}>
                    <h1> 2022 Rules</h1>
                    {showBylaws.includes(2022) ? <RiArrowRightSLine className="bigArrow"/> : <RiArrowDownSLine  className="bigArrow"/>}
                </div>
                <div className={`bylawBody ${showBylaws.includes(2022) ? 'openBylaws' : 'closeBylaws'}`}>
                    <p>Playoff Format: Top 6 overall records</p>
                    <p>Playoff tiebreaker is points for</p>
                    <p>Last place is bottom 4 records overall. Aggregate score. (3 weeks of playoffs. Weeks 15, 16, 17)</p>
                    <p>Draft forfeit rule is waived for thomas. He loses his 5th round pick. </p>
                    <p>League fees are raised to $100 per person with winnings divided 650 / 250 / 100 among top 3 finishers</p>
                    <p>In 2023-2024, you will only be allowed to keep a player that YOU drafted in the 6th round or later, provided that they are still on your roster at the end of the season</p>
                    <p>Punishment is the loser wearing a ridiculous outfit at Olive Garden</p>
                    <p>Draft trades are allowed but ONLY picks for the current draft can be traded. No future picks can be dealt</p>
                </div>
            </div>
            <div className="bylawSection">
                <div className="bylawHeader" onClick={() => {handleClick(2021)}}>
                    <h1> 2021 Rules</h1>
                    {showBylaws.includes(2021) ? <RiArrowRightSLine className="bigArrow"/> : <RiArrowDownSLine  className="bigArrow"/>}
                </div>
                <div className={`bylawBody ${showBylaws.includes(2021) ? 'openBylaws' : 'closeBylaws'}`}>
                    <p>Motion for league expansion fails</p>
                    <p>If you miss 2 drafts in a row you forfeit your pic</p>
                    <p>Auction Waiver in play for next season</p>
                    <p>Keepers no longer need to be announced until your player is called in the draft</p>
                    <p>Draft day trades are now allowed but only using current draft picks. No future picks.</p>
                    <p>Punishment for next seasons loser is the group gets to egg you.</p>
                    <p>playoff format is top 6 overall seeds. Tiebreaker is points for.</p>
                    <p>Last place is bottom 4 records overall aggregate score through the playoffs</p>
                    <p>Parking lot notes: Buy gavel.</p>
                </div>
            </div>
        </div>
        
    )
}

export default BylawsPage;