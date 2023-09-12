import { useState, useEffect } from "react";
import axios from "axios";

function APITestPage(){

    const [sleeperUsers, setSleeperUsers] = useState([]);
    const fetchUsers = async () => {
        const response = await axios.get("https://api.sleeper.app/v1/league/990427440436625408/users");
        const usernames = response.data.map((user) => user.display_name)
        console.log(usernames)
        setSleeperUsers(usernames)
    };

    useEffect(() => {
        fetchUsers()
    }, []);


    return (
        <div className="">
           {sleeperUsers}
        </div>
    )
}

export default APITestPage;