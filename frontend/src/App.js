import NavBar from "./components/global/NavBar";
import Route from "./hooks/Route";
import BylawsPage from "./pages/BylawsPage";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HistoryPage from "./pages/HistoryPage";
import TrophyRoomPage from "./pages/TrophyRoomPage";
import TopManagersPage from "./pages/TopManagersPage";
import SeasonsLogPage from "./pages/SeasonsLogPage";
import HeadToHeadPage from "./pages/HeadToHeadPage";
import StandingsPage from "./pages/StandingsPage";
import StandingsDisplay from "./components/standings/StandingsDisplay";
import NavLinks from "./content/NavLinks";

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useRef } from "react";
import useOutsideClick from "./hooks/useOutsideClick";


function App() {

    const [isChecked, setIsChecked] = useState(false);
    const exceptionRef = useRef(null);

    const handleClickOutside = () => {
        setIsChecked(false);
    };

    const handleCheck = () => {
        setIsChecked(!isChecked)
    };

    const handleMenuClick = (event) => {
        if(isChecked){
            event.stopPropagation();
        }
    };

    const ref = useOutsideClick(handleClickOutside);

    const { seasons } = NavLinks(); // Call NavLink function to get seasons in our DB

    return ( 
        <div className="App">
            <div>
                <header>
                    <h3 className="title">Mead Fantasy Football</h3>
                    <input type="checkbox" id="nav-toggle" className="nav-toggle" ref={ref} checked={isChecked} onChange={handleCheck}/>
                    <nav>
                        <NavBar exceptionRef={exceptionRef}/>
                    </nav>

                    <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={handleMenuClick}>
                        <span><AiOutlineMenu className="nav-dropdown-icon"/></span>
                    </label>
                </header>
            </div>

            <div className="content">
                {seasons.map((season) => (
                    <Route key={season.season} path={`/standings/${season.season}`}>
                        <StandingsDisplay year={season.season}/>
                    </Route>
                ))}
                <Route path="/standings">
                    <StandingsPage/>
                </Route>
                <Route path="/bylaws">
                    <BylawsPage />
                </Route>
                <Route path="/stats2023">
                    <AnalyticsPage/>
                </Route>
                <Route path="/history">
                    <HistoryPage/>
                </Route>
                <Route path="/trophyroom">
                    <TrophyRoomPage/>
                </Route>
                <Route path="/topmanagers">
                    <TopManagersPage/>
                </Route>
                <Route path="/seasonslog">
                    <SeasonsLogPage/>
                </Route>
                <Route path="/headtohead">
                    <HeadToHeadPage/>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </div>
        </div>
    )
}

export default App;