import axios from "axios";
import { useEffect } from "react";



function HistoricalData(){

    const fetchHistoricalData = async() => {
        const seasons = await axios.get('/api/seasons');
        console.log(seasons)
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