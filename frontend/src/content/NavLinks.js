import { GoRocket, GoLog, GoTrophy, GoPeople} from "react-icons/go";
import { TbChartBar } from "react-icons/tb";
import { BiBarChartAlt2 } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoStatsChartOutline } from "react-icons/io5";
import { GiBattleGear } from "react-icons/gi";

const historyLinks = [
    {label: 'Trophy Room', path: '/trophyroom', icon: <GoTrophy/>, description: 'Check out the past winners and losers of the league'},
    {label: 'Top Managers', path: '/topmanagers', icon: <GoPeople/>, description: 'View all time career stats for league managers'},
    {label: 'Seasons Log', path: '/seasonslog', icon: <IoStatsChartOutline/>, description: 'A look at individual manager performance over the years'},
    {label: 'Head to Head', path: '/headtohead', icon: <GiBattleGear/>, description:'Compare two managers in their head to head matchups'},
];

const links = [
    {label: 'Standings', path: '/', icon: <BiBarChartAlt2/>},
    {label: 'Bylaws', path: '/bylaws', icon: <GoLog/>},
    {label: 'Analytics', path: '/analytics', icon: <GoRocket/>},
    {label: 'History', path: '/history', icon: <TbChartBar/>, submenu: historyLinks, dropdownIcon: <RiArrowDropDownLine />},
];

export {links, historyLinks};