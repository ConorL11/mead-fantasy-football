import NavLinks from "../../content/NavLinks";

function NavBarManagers({ seasons, onItemClick, selectedManager }){

    const { managers, managersLoading } = NavLinks();
    if (managersLoading) {
        // Render skeleton loading
        return (
            <ul className="navBarManagersList">
                {[1].map((index) => (
                    <li key={index} className="seasonsLogNav skeletonLoading">
                        ...Loading Managers
                    </li>
                ))}
            </ul>
        );
    }

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