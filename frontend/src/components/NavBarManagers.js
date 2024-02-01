// import { useState } from "react";

function NavBarManagers({ managers, seasons, onItemClick }){

    return(
        <div className="navBarManagersContainer">
            <ul className="navBarManagersList">
                {managers.map((manager) => (
                    <li key={manager._id} onClick={() => onItemClick(manager, seasons)}>{manager.user_name}</li>
                ))}
            </ul>
        </div>
    )

}

export default NavBarManagers