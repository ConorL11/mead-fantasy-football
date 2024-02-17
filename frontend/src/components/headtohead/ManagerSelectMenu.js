function ManagerSelectMenu({ managers, selectedManagers, dropdownName, onChange }){

    
    const disabledOptions = Object.values(selectedManagers).filter(value => value !== selectedManagers[dropdownName]);
    return(
        <div className="managerSelectMenuContainer">
            <select onChange={(event) => onChange(event.target.value)} defaultValue="">
                <option value="" disabled >
                    Select a Manager
                </option>
                {managers.map((manager) => (
                    <option key={manager._id} value={manager._id} disabled={disabledOptions.indexOf(manager._id) !== -1}>
                        {manager.user_name}
                    </option>
                ))}
            </select>
        </div>
    )

}

export default ManagerSelectMenu