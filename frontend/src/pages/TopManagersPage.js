import axios from "axios";
import { useState, useEffect } from "react";


function TopManagersPage(){

    useEffect(() => {
        getLeagueResults();
    }, []);

    const getLeagueResults = async() => {
        const {data: seasons} = await axios.get('/api/seasons');
        const {data: members} = await axios.get('/api/leagueMembers');
    }


    return(
        <div>
            <br></br>
            <div>Now now now now now now now..... we find out who is the best manager</div>
        </div>
    )

}

export default TopManagersPage;