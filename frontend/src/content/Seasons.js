import { useEffect, useState } from "react";
import axios from "axios";

function Seasons() {
    const [seasons, setSeasons] = useState([]);

    const getSeasons = async() => {
        const {data: seasons} = await axios.get('/api/seasons');
        setSeasons(seasons) ;
    }

    useEffect(() => {
        getSeasons();
    }, []);
}

export default Seasons;