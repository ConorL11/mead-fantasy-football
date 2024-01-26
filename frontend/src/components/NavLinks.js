import { useState } from "react";
import { GoRocket, GoLog, GoTrophy} from "react-icons/go"
import { BiBarChartAlt2 } from "react-icons/bi"
import Link from "./Link";
import "../styles.css"


function NavLinks({show}){

    const [showSubMenu, setShowSubmenu] = useState(false);

    const handleHistoryMouseEnter = () => {
        setShowSubmenu(true);
    };

    const handleHistoryMouseLeave = () => {
        setShowSubmenu(false);
    };

    const historyLinks = [
        {label: 'Trophy Room', path: '/trophyroom', icon: <GoTrophy/>},
    ];

    const links = [
        {label: 'Standings', path: '/', icon: <BiBarChartAlt2/>},
        {label: 'Bylaws', path: '/bylaws', icon: <GoLog/>},
        {label: 'Analytics', path: '/analytics', icon: <GoRocket/>},
        {label: 'History', path: '/history', icon: <GoTrophy/>, submenu: historyLinks},
    ];


    const renderedLinks = links.map((link) => {
        return (
            <li key={link.label} onMouseEnter={link.submenu ? handleHistoryMouseEnter : undefined} onMouseLeave={link.submenu ? handleHistoryMouseLeave : undefined}>
                <div className="navLink">
                    <Link 
                        key={link.label} 
                        to={link.path} 
                    >
                        <span >{link.icon}</span>
                        <span className="pl_1">{link.label}</span>
                    </Link>
                    {link.submenu && showSubMenu && (
                        <div className="navSubMenu">
                            {link.submenu.map((submenuLink) => (
                                <div key={submenuLink.label}>
                                <Link to={submenuLink.path}>
                                    <span>{submenuLink.icon}</span>
                                    <span className="pl_1">{submenuLink.label}</span>
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
        <div >
            <ul>
                {renderedLinks}
            </ul>
        </div>
    )
}

export default NavLinks;