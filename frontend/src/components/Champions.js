import axios from "axios";
import { useEffect } from "react";

// Conor Steps to complete
// 1 - build data model with year, champion, runner up, loser, and high scorer. Include season stats and sleeper Ids with all key players.
// 2 - Create front end display


function Champions(){

    useEffect(() => {
        getLeagueResults();
    }, []);



    const getLeagueResults = async() => {
        const {data: seasons} = await axios.get('/api/seasons');
        const {data: members} = await axios.get('/api/leagueMembers');
        const champions = processData(seasons, members);

        console.log('champions', champions)
    }

    const processData = (seasons, members) => {
        console.log('seasons', seasons);
        console.log('members', members);

        let champions = []
        // Conor Working Here

        for(const season of seasons){
            let championUser = members.find(member => member._id === season.results.championUser);
            let runnerUpUser = members.find(member => member._id === season.results.runnerUpUser);
            let losingUser = members.find(member => member._id === season.results.losingUser);

            let highScorerStats = season.teams.sort((a,b) => b.summary.regularSeason.points - a.summary.regularSeason.points)[0];

            const highScorerUser = members.find(member => (
                season.results.platform === 'espn' ?
                member.espn_ids.some(id => id === highScorerStats.owners) :
                member.sleeper_ids.some(id => id === highScorerStats.owners)
            ));

            console.log("High Scorer Stats:", highScorerStats);
            console.log("High Scorer User:", highScorerUser);

        }


        // Sample Data Model
        // const sampleData = [{
        //     season: 2023,
        //     champion: {
        //         user : {
        //             id: 1234,
        //             name: 'Conor',
        //         },
        //         stats: {
        //             avgPointsFor: 123.1,
        //             avgPointsAgainst: 110,
        //             wins: 8,
        //             losses: 4,
        //         }
        //     },
        //     runnerUp: {
        //         // blahblahblah
        //     },
        //     loser : {
        //         // blahblahblah
        //     },
        //     highScorer: {
        //         // blahblahblah
        //     }
        // }];
        return champions
    }
    
    return (
        <div>
            League Champions
        </div>
    )

}

export default Champions