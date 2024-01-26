import NavBar from "./components/NavBar";
import Route from "./components/Route";

import BylawsPage from "./pages/BylawsPage";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HistoryPage from "./pages/HistoryPage";
import TrophyRoomPage from "./pages/TrophyRoomPage";

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import useOutsideClick from "./hooks/useOutsideClick";

function App() {

    const [isChecked, setIsChecked] = useState(false);

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

    return ( 
        <div className="App">
            <div>
                <header>
                    <h3 className="title">Mead Fantasy Football</h3>
                    <input type="checkbox" id="nav-toggle" className="nav-toggle" ref={ref} checked={isChecked} onChange={handleCheck}/>
                    <nav>
                        <NavBar/>
                    </nav>
                    <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={handleMenuClick}>
                        <span><AiOutlineMenu className="nav-dropdown-icon"/></span>
                    </label>
                </header>
            </div>

            <div className="content">
                <Route path="/">
                    <HomePage/>
                </Route>
                <Route path="/bylaws">
                    <BylawsPage />
                </Route>
                <Route path="/analytics">
                    <AnalyticsPage/>
                </Route>
                <Route path="/history">
                    <HistoryPage/>
                </Route>
                <Route path="/trophyroom">
                    <TrophyRoomPage/>
                </Route>
            </div>
        </div>
    )
}

export default App;