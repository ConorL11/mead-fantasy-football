import axios from "axios";
import { useState, useEffect } from "react";

import NavBarManagers from "../components/seasonslog/NavBarManagers";
import SeasonsLogAveragePoints from "../components/seasonslog/SeasonsLogAveragePoints";
import SeasonsLogRecords from "../components/seasonslog/SeasonsLogRecords";
import ManagerSummary from "../components/seasonslog/ManagerSummary";


function SeasonsLogPage(){

    const [managerList, setManagerList] = useState([]);
    const [seasons, setSeasons] = useState([]);


    const [selectedManager, setSelectedManager] = useState(null);

    const getData = async () => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: managersRaw} = await axios.get('/api/leagueMembers');

        const managers = managersRaw.filter(manager => manager.active).sort((a,b) => a.user_name.localeCompare(b.user_name));
        setManagerList(managers);
        setSeasons(seasonsRaw);
    }


    const handleManagerSelection = (managerRaw) => {
        setSelectedManager((prevManager) => {
            const manager = processData(seasons, managerRaw);
            return manager;
        });
    }

    const processData = (seasons, manager) => {

        let ownerIds = manager.espn_ids.concat(manager.sleeper_ids);
        manager.seasons = [];
        // Loop over seasons to grab all of a managers seasons
        for(const season of seasons){
            let team = season.teams.find(team => team.owners.some(id => ownerIds.includes(id)));
            if(team){
                manager.seasons.push({
                    year: season.season,
                    results: season.results,
                    team,
                });
            }
        }
        manager.seasons.sort((a,b) => b.year - a.year);
        return manager
    }


    useEffect(() => {
        getData();
    }, []);


    return(
        <div className="seasonsLogContainer">
            <NavBarManagers managers={managerList} onItemClick={handleManagerSelection} selectedManager={selectedManager}/>
            {selectedManager && (
                <div>
                    <ManagerSummary manager={selectedManager} />
                    <SeasonsLogAveragePoints manager={selectedManager}/>
                    <SeasonsLogRecords manager={selectedManager}/>
                </div>
            )}
        </div>
    )
}
export default SeasonsLogPage;