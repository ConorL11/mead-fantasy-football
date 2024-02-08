import axios from "axios";
import { useState, useEffect } from "react";
import ManagerSelectMenu from "../components/headtohead/ManagerSelectMenu";

function HeadToHeadPage(){

    const [managerList, setManagerList] = useState([]);
    const [seasons, setSeasons] = useState([]);


    const [selectedManagers, setSelectedManagers] = useState({manager1: null, manager2: null});


    const getData = async () => {
        const {data: seasonsRaw} = await axios.get('/api/seasons');
        const {data: managersRaw} = await axios.get('/api/leagueMembers');

        const managers = managersRaw.filter(manager => manager.active).sort((a,b) => a.user_name.localeCompare(b.user_name));
        setManagerList(managers);
        setSeasons(seasonsRaw);
    }

    const handleOptionChange = (dropdownName, selectedValue) => {
        const updatedSelectedManagers = {
            ...selectedManagers,
            [dropdownName]: selectedValue
        }
        setSelectedManagers(updatedSelectedManagers);
        processData(seasons, updatedSelectedManagers);
    }

    const processData = async (seasons, selectedManagers) => {
        console.log("seasons", seasons)
        console.log("selectedManagers", selectedManagers)
    }



    useEffect(() => {
        getData();
    }, [selectedManagers]);

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