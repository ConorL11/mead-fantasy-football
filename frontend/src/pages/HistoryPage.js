// import { pastWinners } from "../content/constants";
// import { useState, useEffect } from "react";
// import axios from "axios";
import Link from "../components/Link";
import {historyLinks} from "../content/NavLinks";
// import TrophyRoom from "./TrophyRoomPage";

function HistoryPage() {

    return (
        <div className="historyPageGrid">
            {historyLinks.map((link) => (
                <Link key={link.label} to={link.path} className="historyPageCard">
                    <span >{link.icon}</span>
                    <span className="pl_1">{link.label}</span>
                </Link>
            ))}
        </div>
    )
}

export default HistoryPage;