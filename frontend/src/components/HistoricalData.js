import axios from "axios";
import { useEffect } from "react";



function HistoricalData(){

    const fetchHistoricalData = async() => {
        const seasons = await axios.get('/api/seasons');
        const members = await axios.get('/api/leaguemembers');

        console.log('seasons', seasons)
        console.log('members', members)

    }

    useEffect(() => {
        fetchHistoricalData()
    }, [])
    

    return (
        <div>
            Historical Data Pull Here....
        </div>
    )

}

export default HistoricalData