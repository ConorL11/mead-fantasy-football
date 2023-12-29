import axios from "axios";
import { useEffect } from "react";
import { pastWinners } from "../content/constants";

function HistoricalData(){
    const leagueId2021 = '863906445559795712';
    const espnLeagueId = '322485';

    // ESPN API v2 - works for seasons 2017 and earlier
    // https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/322485?seasonId=2017&view=mTeam

    // ESPN API v3 - works for seasons 2018 on
    // https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/322485?view=mTeam

    // Setup / Steps
    // 1 - Pull leagueMembers from Mongo
    // 2 - Pull League History JSON Object from Data / Constants
    // 3 - Loop over League History, pulling and transforming data for each ESPN or Sleeper Season. Populate a transactions array of objects. 
    // 4 - Double check code, then port over to backend
    // 5 - Run an insert with the transactions array of objects


    // general function to pull Historical Data and Transform it to desired data model
    const fetchHistoricalData = async () => {
        let historicalData = [];

        // fetch league Members
        const {data: leagueMembers} = await axios.get('/api/leagueMembers');

        for(const season of pastWinners){
            if(season.year === '2019' || season.year === '2018') {return} // Using this as a temporary fix to resolve auth issues with 2019 and earlier leagues
            console.log(season)
            if(season.platform === 'espn'){
                await fetchEspnTransactions(season.year, espnLeagueId);
            }
        }

        // // get transaction history from Sleeper
        // let transactions = [];
        // const transactions2021 = await fetchSleeperTransactions(leagueId2021, 2021);
        // transactions.push(transactions2021);

    }

    const fetchEspnTransactions = async (season, leagueId) => {
        // ESPN v3 API - works for seasons 2018 and beyond. 
        let apiUrl = season <= 2017 ? `https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/${322485}?seasonId=${season}&view=mTeam` : `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${322485}?view=mTeam`;
        let espnTransactions = [];
        try {
            const {data: espnData} = await axios.get(apiUrl);
            // Handle the response
            espnData.teams.map(team =>
                espnTransactions.push({
                    team: team.name,
                    owners: team.owners,
                    pickups: team.transactionCounter.acquisitions,
                    trades: team.transactionCounter.trades
                })
            );
            console.log("ESPN Data", espnTransactions);
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    }

    // Function to fetch Sleeper Transactions for completed seasons
    const fetchSleeperTransactions = async (leagueId, year) => {
        // account for change in number of NFL games
        let allTransactions = [];
        const countGames =  year < 2021 ? 15 : 16;
        for(let i=1; i <= countGames; i++){
            let responseTransactions = await axios.get("https://api.sleeper.app/v1/league/"+leagueId+"/transactions/"+i);
            allTransactions.push(responseTransactions.data);
        }
        const seasonTransactions = {season: year, transactions: allTransactions};
        return seasonTransactions;
    }



    // // Function to get transactions and assign them to roster ID Map
    // const fetchTransactions = async (currentWeek, rosterIdMap) => {
    //     // Pull in Transactions and append to users via Roster Id Map
    //     for(let i = 1; i < currentWeek; i++){
    //         const week = await axios.get("https://api.sleeper.app/v1/league/"+leagueId2021+"/transactions/"+i);
    //         for(const transaction of week.data){
    //             for(const rosterId of transaction.roster_ids){
    //                 transaction.type === 'trade' ? rosterIdMap[rosterId].trades ++  : rosterIdMap[rosterId].adds ++;
    //             }
    //         }
    //     }
    // }


    useEffect(() => {
        fetchHistoricalData();
        // fetchEspnTransactions();
    }, []);

    return (
        <div className="mt-2">
            I'm fetching and transforming some historical data in the background....
        </div>
    )
}

export default HistoricalData;