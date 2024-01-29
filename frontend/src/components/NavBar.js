import { useState } from "react";
import {links} from "../content/NavLinks"

import Link from "./Link";
import "../styles.css"

function NavBar({show}){


    const [showSubMenu, setShowSubmenu] = useState(false);

    const handleHistoryMouseEnter = () => {
        setShowSubmenu(true);
    };

    const handleHistoryMouseLeave = () => {
        setShowSubmenu(false);
    };


    const renderedLinks = links.map((link) => {
        return (
            <li 
                key={link.label} 
                onMouseEnter={link.submenu ? handleHistoryMouseEnter : undefined} 
                onMouseLeave={link.submenu ? handleHistoryMouseLeave : undefined}
            >
                <div className={`navLink ${link.submenu ? 'navParentLink' : ''}`}>
                    <Link
                        key={link.label} 
                        to={link.path} 
                    >
                        <span className="navIcon">{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                    {link.submenu && (
                        <div className={`navSubMenu ${showSubMenu ? 'showNavSubMenu' : ''}`}>
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