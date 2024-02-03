// import { useState } from "react";

function NavBarManagers({ managers, seasons, onItemClick, selectedManager }){


    console.log(selectedManager)
    return(
        <div className="navBarManagersContainer">
            <ul className="navBarManagersList">
                {managers.map((manager) => (
                    <li 
                        key={manager._id} 
                        onClick={() => onItemClick(manager, seasons)}
                        className={`seasonsLogNav ${selectedManager && selectedManager._id === manager._id ? 'highlightElement' : ''}`}
                    >
                        {manager.user_name}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default NavBarManagers