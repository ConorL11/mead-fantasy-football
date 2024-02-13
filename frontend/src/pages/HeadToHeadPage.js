import axios from "axios";
import { useState, useEffect } from "react";
import ManagerSelectMenu from "../components/headtohead/ManagerSelectMenu";

function HeadToHeadPage(){

    const [managerList, setManagerList] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [selectedManagers, setSelectedManagers] = useState({manager1: null, manager2: null});

    // retrieves data from API 
    const getData = async () => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: managersRaw} = await axios.get('/api/leagueMembers');
        const managers = managersRaw.filter(manager => manager.active).sort((a,b) => a.user_name.localeCompare(b.user_name));
        setManagerList(managers);
        setSeasons(seasonsRaw);
    }

    // Handles change in the select menus
    const handleOptionChange = (dropdownName, selectedValue) => {
        setSelectedManagers(prevState => ({
            ...prevState,
            [dropdownName]: selectedValue
        }));
    }

    const processData = async (seasons, managerList, selectedManagers) => {
        console.log("seasons", seasons)
        console.log("managerList", managerList)

        // Don't finish processing if we don't have selections for both menus
        if(!selectedManagers.manager1 || !selectedManagers.manager2){ return }

        // Initialize Manager Comp Arry and Lookup Map
        const managerComp = [];
        const managerLookup = {};

        // Initialize Managers, Create Owner Ids Array with ESPN and Sleeper Ids, and Initialize Seasons Array
        [selectedManagers.manager1, selectedManagers.manager2].forEach(managerId => {
            const manager = managerList.find(manager => manager._id === managerId);
            manager.ownerIds = manager.espn_ids.concat(manager.sleeper_ids);
            manager.seasons = [];
            manager.summary = {
                championships: 0,
                biggestLosers: 0,
                runnerUps: 0,

                games: 0,
                points: 0,
                pointsAgainst: 0,
                wins: 0,
                losses: 0,
                seedTotal: 0,
                adds: 0,
                trades: 0,
                expectedWins: 0,
                playoffAppearances: 0,
            };
            manager.headToHead = {
                games: 0, 
                wins: 0, 
                losses: 0, 
                playoffGames: 0,
                playoffWins: 0,
                playoffLosses: 0,
            }

            managerComp.push(manager);
            managerLookup[manager] = manager;
        });

        // Loop over seasons and assign seasons to each selected manager
        for(const season of seasons){
            for(const manager of managerComp){
                let team = season.teams.find(team => team.owners.some(id => manager.ownerIds.includes(id)));
                if(team){
                    manager.seasons.push({
                        year: season.season,
                        results: season.results,
                        team,
                    });
                }
            }
        }

        // Sort Seasons
        managerComp.forEach(manager => {
            manager.seasons.sort((a, b) => b.year - a.year);
        });

        console.log("managerComp", managerComp)

        
        //Steps: 
        // Define Empty object for managers
        // Loop over Seasons.teams to grab overall comps
        // Loop over seasons.schedule to grab H2H Comps


        // Final Object should look like this: 
        // const sampleManagerComp = {
        //     manager1: {
        //         id: '',
        //         user_name: '',
        //         wins: '',
        //         // ... other properties
        //     }, 
        //     manager2: {
        //         id: '',
        //         user_name: '',
        //         wins: '',
        //         // ... other properties
        //     },         
        // }
    }

    // Grabs full list of managers and seasons from the API
    useEffect(() => {
        getData();
    }, []);


    // Runs filters and processes data to compare maanagers when select menus change
    useEffect(()=> {
        processData(seasons, managerList, selectedManagers)
    }, [seasons, managerList, selectedManagers]);

    return(
        <div>
            <br></br>
            <div>I'm the Head to head matchup page!</div>
            <div className="flexHorizontal">
                <ManagerSelectMenu 
                    managers={managerList}
                    selectedManagers={selectedManagers}
                    dropdownName="manager1"
                    onChange={(value) => handleOptionChange('manager1', value)}
                />
                <ManagerSelectMenu 
                    managers={managerList}
                    selectedManagers={selectedManagers}
                    dropdownName="manager2"
                    onChange={(value) => handleOptionChange('manager2', value)}
                />
            </div>

        </div>
    )

}

export default HeadToHeadPage;