import { useState } from "react";
import NavLinks from "../content/NavLinks"

import Link from "./Link";
import "../styles.css"

function NavBar({show}){

    const { links } = NavLinks(); // Call NavLink function to get the links

    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMouseEnter = (label) => {
        setActiveSubMenu(label);
    };

    const handleMouseLeave = () => {
        setActiveSubMenu(null);
    };


    const renderedLinks = links.map((link) => {
        return (
            <li 
                key={link.label} 
                onMouseEnter={link.submenu ? () => handleMouseEnter(link.label) : undefined}
                onMouseLeave={link.submenu ? handleMouseLeave : undefined}
            >
                <div className={`navLink ${link.submenu ? 'navParentLink' : ''} ${link.label === 'Standings' ? 'standingsNav' : ''}`}>
                    <Link
                        key={link.label} 
                        to={link.path} 
                    >
                        <span className="navIcon">{link.icon}</span>
                        <span>{link.label}</span>
                        {link.dropdownIcon && (<span className="navBarDropDownIcon">{link.dropdownIcon}</span>)}
                    </Link>
                    {link.submenu && (
                        <div className={`navSubMenu ${activeSubMenu === link.label ? 'showNavSubMenu' : ''}` }>
                            {link.submenu.map((submenuLink) => (
                                <div key={submenuLink.label} className="navSubMenuItem">
                                <Link to={submenuLink.path}>
                                    <span className="navIcon">{submenuLink.icon}</span>
                                    <span>{submenuLink.label}</span>
                                </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </li>
        )
    });

    return(
        <div>
            <ul>
                {renderedLinks}
            </ul>
        </div>
    )
}

export default NavBar;