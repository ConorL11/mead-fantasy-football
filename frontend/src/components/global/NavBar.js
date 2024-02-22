import { useState, useRef } from "react";
import NavLinks from "../../content/NavLinks"
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

import Link from "./Link";
import "../../styles.css"

function NavBar({show, exceptionRef}){

    const { links } = NavLinks(); // Call NavLink function to get the links
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [activeMobileSubMenus, setActiveMobileSubMenus] = useState([]);
    const mobileMenuClicked = useRef(false); // Flag to track if mobile menu is clicked


    const expandMobileMenu = (event, label) => {
        event.stopPropagation();
        mobileMenuClicked.current = true;

        setActiveSubMenu(null);
        setActiveMobileSubMenus((prev) => {return [...prev, label]});
    }

    const collapseMobileMenu = (event, label)=> {
        event.stopPropagation();
        mobileMenuClicked.current = true;

        setActiveSubMenu(null);
        setActiveMobileSubMenus((prev) => {
            return prev.filter((menu) => menu !== label);
        });
    }

    const handleMouseEnter = (label, event) => {
        // Prevent this function from interfering with mobile clicks
        if (mobileMenuClicked.current) {
            mobileMenuClicked.current = false;
            return;
        }
        setActiveSubMenu(label);
        setActiveMobileSubMenus([]);
    }

    const handleMouseLeave = () => {
        setActiveSubMenu(null);
        setActiveMobileSubMenus([]);
    }

    const renderedLinks = links.map((link) => {
        return (
            <li 
                key={link.label} 
                onMouseEnter={link.submenu ? ((label) => (event) => handleMouseEnter(label, event)) (link.label) : undefined}
                onMouseLeave={link.submenu ? handleMouseLeave : undefined}
            >
                <div className={`navLink`}>
                    <div className={`${link.submenu ? 'navParentLink' : ''}` }>
                        <Link key={link.label} to={link.path}>
                            <span className="navIcon">{link.icon}</span>
                            <span>
                                <span>{link.label} </span>
                                {link.dropdownIcon && (<span className="navBarDropDownIcon">{link.dropdownIcon}</span>)}
                            </span>
                            
                        </Link>
                        {link.dropdownIcon && (
                            activeMobileSubMenus.includes(link.label) ?
                                <span className="mobileNavDropDownIcon" onClick={(event) => collapseMobileMenu(event, link.label)} ref={exceptionRef}> <RiArrowRightSLine /></span>
                                : 
                                <span className="mobileNavDropDownIcon" onClick={(event) => expandMobileMenu(event, link.label)} ref={exceptionRef}> <RiArrowDownSLine /></span>
                        )}
                    </div>
                    {(link.submenu && (activeSubMenu === link.label || activeMobileSubMenus.includes(link.label))) && (
                        <div className={`navSubMenu showNavSubMenu`}>
                            {link.submenu.map((submenuLink) => (
                                <div key={submenuLink.label} className="navSubMenuItem">
                                    <Link to={submenuLink.path} >
                                        <span className="navIcon">{submenuLink.icon}</span>
                                        <span className={`${link.label === 'Standings' ? 'mediumFont' : ''}`}>{submenuLink.label}</span>
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