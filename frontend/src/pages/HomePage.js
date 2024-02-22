import CountdownTimer from "../components/home/CountdownTimer";
import SeasonResults from "../components/home/SeasonResults";
function HomePage(){

    return (
        <div className="homePageContainer">
            <div className="homeIntro">
                <h2>Our Fantasy Football Data Hub</h2>
                <p>Step into the annals of football history with our dedicated fantasy football platform, curated specifically for the Mead Fantasy Football League. Built for you by your beloved league secretary, this website serves as the hub for our league, which has migrated back and forth from platform to platform a few too many times.</p>
                <p>With this site, you'll be able to see clean visualizations of the stats and history that we've created over a decade plus of friendship and Fantasy Football. Check out the standings over the years, look at the detailed stats for the latest season, check out historical comparisons, or even reference our annual rules.</p>
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