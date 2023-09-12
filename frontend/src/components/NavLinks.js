import { GoRocket, GoLog, GoTrophy} from "react-icons/go"
import { BiBarChartAlt2 } from "react-icons/bi"
import Link from "./Link";
import "../styles.css"


function NavLinks({show}){

    const links = [
        {label: 'Standings', path: '/', icon: <BiBarChartAlt2/>},
        {label: 'Bylaws', path: '/bylaws', icon: <GoLog/>},
        // {label: 'Analysis', path: '/analysis', icon: <GoRocket/>},
        {label: 'CPI', path: '/conorspowerindex', icon: <GoRocket/>},
        {label: 'History', path: '/history', icon: <GoTrophy/>},

    ];

    const renderedLinks = links.map((link) => {
        return (
            <li key={link.label}>
                <div className="navLink">
                    <Link 
                        key={link.label} 
                        to={link.path} 
                    >
                        <span >{link.icon}</span>
                        <span className="pl_1">{link.label}</span>
                    </Link>
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

export default NavLinks;