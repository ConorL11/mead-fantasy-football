import { GoRocket, GoLog, GoTrophy} from "react-icons/go"
import { BiBarChartAlt2 } from "react-icons/bi"


const historyLinks = [
    {label: 'Trophy Room', path: '/trophyroom', icon: <GoTrophy/>, description: 'Check out the past winners and losers of the league'},
    // {label: 'Manager Comparison', path: '/managercomparison', icon: <GoTrophy/>},
    // {label: 'Head to Head', path: '/headtohead', icon: <GoTrophy/>},
    // {label: 'Individual Performance', path: '/individualperformance', icon: <GoTrophy/>},
    // {label: 'Season Comparison', path: '/seasoncomparison', icon: <GoTrophy/>},

];

const links = [
    {label: 'Standings', path: '/', icon: <BiBarChartAlt2/>},
    {label: 'Bylaws', path: '/bylaws', icon: <GoLog/>},
    {label: 'Analytics', path: '/analytics', icon: <GoRocket/>},
    {label: 'History', path: '/history', icon: <GoTrophy/>, submenu: historyLinks},
];

export {links, historyLinks};