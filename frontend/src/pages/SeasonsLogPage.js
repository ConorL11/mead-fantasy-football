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

        //Loop over seasons to get Manager Summary
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

        for(const season of manager.seasons){
            manager.summary.championships += (season.results.championUser === manager._id) ? 1 : 0;
            manager.summary.runnerUps += (season.results.runnerUpUser === manager._id) ? 1 : 0;
            manager.summary.biggestLosers += (season.results.losingUser === manager._id) ? 1 : 0;
            manager.summary.games += (season.team.summary.regularSeason.wins + season.team.summary.regularSeason.losses);
            manager.summary.points += season.team.summary.regularSeason.points;
            manager.summary.pointsAgainst += season.team.summary.regularSeason.pointsAgainst;
            manager.summary.wins += season.team.summary.regularSeason.wins;
            manager.summary.losses += season.team.summary.regularSeason.losses;
            manager.summary.seedTotal += season.team.summary.regularSeason.playoffSeed;
            manager.summary.adds += season.team.transactions.adds;
            manager.summary.trades += season.team.transactions.trades;

            manager.summary.expectedWins += season.team.summary.regularSeason.expectedWins;
            manager.summary.playoffAppearances += (season.team.summary.regularSeason.playoffSeed <= 6) ? 1 : 0;
        }

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