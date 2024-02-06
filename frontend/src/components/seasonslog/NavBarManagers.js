// import { useState } from "react";

function NavBarManagers({ managers, seasons, onItemClick, selectedManager }){

    return(
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
    )

}

export default NavBarManagers