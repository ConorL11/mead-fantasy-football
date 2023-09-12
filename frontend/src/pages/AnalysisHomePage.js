import Link from "../components/Link";
import Route from "../components/Route";
import APITestPage from "./APITestPage";

function AnalysisHomePage({show}){
    return (
        <div className="">
            <div>Coming soon!</div>
            <div className="analysisTile">
                <Link
                    key="apitest"
                    to="/analysis/apitest"
                >
                    <div>Test Link</div>
                </Link>
                <div>
                    <Route path="/analysis/apitest">
                        <APITestPage/>
                    </Route>
                </div>
            </div>
        </div>
    )
}

export default AnalysisHomePage;