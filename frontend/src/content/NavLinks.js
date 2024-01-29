import { GoRocket, GoLog, GoTrophy, GoPeople} from "react-icons/go"
import { TbChartBar } from "react-icons/tb";
import { BiBarChartAlt2 } from "react-icons/bi"


const historyLinks = [
    {label: 'Trophy Room', path: '/trophyroom', icon: <GoTrophy/>, description: 'Check out the past winners and losers of the league'},
    {label: 'Top Managers', path: '/topmanagers', icon: <GoPeople/>, description: 'View all time career stats for league managers'},
    // {label: 'Head to Head', path: '/headtohead', icon: <GoTrophy/>},
    // {label: 'Individual Performance', path: '/individualperformance', icon: <GoTrophy/>},
    // {label: 'Season Comparison', path: '/seasoncomparison', icon: <GoTrophy/>},

];

const links = [
    {label: 'Standings', path: '/', icon: <BiBarChartAlt2/>},
    {label: 'Bylaws', path: '/bylaws', icon: <GoLog/>},
    {label: 'Analytics', path: '/analytics', icon: <GoRocket/>},
    {label: 'History', path: '/history', icon: <TbChartBar/>, submenu: historyLinks},
];

export {links, historyLinks};