import axios from "axios";
import { useEffect } from "react";

function HistoricalData(){
    const leagueId2021 = '863906445559795712';
    const espnLeagueId = '322485';


    // general function to pull Historical Data and Transform it to desired data model
    const fetchHistoricalData = async () => {

        // get transaction history from Sleeper
        let transactions = [];
        const transactions2021 = await fetchHistoricalTransactions(leagueId2021, 2021);
        transactions.push(transactions2021);
        console.log("transactions",transactions);
    }

    // Function to fetch Sleeper Transactions for completed seasons
    const fetchHistoricalTransactions = async (leagueId, year) => {
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



    useEffect(() => {
        fetchHistoricalData();
    }, []);

    return (
        <div className="mt-2">
            I'm fetching and transforming some historical data in the background....
        </div>
    )
}

export default HistoricalData;