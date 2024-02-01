import axios from "axios";
import { useState, useEffect } from "react";

import NavBarManagers from "../components/NavBarManagers";
import SeasonsLogAveragePoints from "../components/SeasonsLogAveragePoints";


function SeasonsLogPage(){

    const [managerList, setManagerList] = useState([]);
    const [seasons, setSeasons] = useState([]);


    const [selectedManager, setSelectedManager] = useState(null);


    const handleManagerSelection = (manager) => {
        setSelectedManager((prevManager) => {
            console.log('manager', manager)
            console.log(seasons);

            // Hey Conor. Do some shit here tomorrow ya big dumb idiot
            return manager;
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: managersRaw} = await axios.get('/api/leagueMembers');

        const managers = managersRaw.filter(manager => manager.active).sort((a,b) => a.user_name.localeCompare(b.user_name));
        setManagerList(managers);
        setSeasons(seasonsRaw);
    }



    return(
        <div>
            <NavBarManagers managers={managerList} onItemClick={handleManagerSelection}/>
            {selectedManager && (
                <div>
                    <SeasonsLogAveragePoints manager={selectedManager}/>
                </div>
            )}
        </div>
    )
}
export default SeasonsLogPage;