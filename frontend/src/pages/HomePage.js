import CountdownTimer from "../components/home/CountdownTimer";
import SeasonResults from "../components/home/SeasonResults";
function HomePage(){

    return (
        <div className="homePageContainer">
            <div className="homeIntro">
                <h2>Meads Only FF League</h2>
                <p> 
                    Step into the annals of football history with our dedicated fantasy football platform, curated specifically for the Mead Fantasy Football League. Built for you by your beloved league secretary, this website serves as the hub for our league, which has migrated across many platforms many times. If only we'd stuck to Sleeper, I would never have had to create this. Anyways, feel free to check out the Standings and Playoff Brackets over the years, check out how you've performed over the years, or even see who has won head to head matchups. Feel free to leave me disparaging remarks in the group text if something is uncovered that you dislike.
                </p>
            </div>
            <div className="homeBody">
                <div className="preseasonHeader">
                    <h2>NFL Preseason</h2>
                </div>
                <div className="preseasonBody">
                    <div className="preseasonItem">
                        <CountdownTimer countdownDate={'2024-09-05'} />
                    </div>
                    <div className="preseasonItem">
                        <SeasonResults />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;