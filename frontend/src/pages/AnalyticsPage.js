import AveragePoints from "../components/AveragePoints";
import SleeperData from "../components/SleeperData";

function AnalyticsPage(){

    return (
        <div>
            <div>
                Home Page for current seasson's analytics
            </div>
            <div>
                {/* <AveragePoints /> */}
                <SleeperData />
            </div>
        </div>
    )
}

export default AnalyticsPage;