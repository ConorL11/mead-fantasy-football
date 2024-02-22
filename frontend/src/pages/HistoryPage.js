import Link from "../components/global/Link";
import NavLinks from "../content/NavLinks";

function HistoryPage() {

    const { historyLinks } = NavLinks();

    return (
        <div className="historyPageGrid">
            {historyLinks.map((link) => (
                <Link key={link.label} to={link.path} className="historyPageCard">
                    <h2 className="">{link.label}</h2>
                    <div className="bigIcon">{link.icon}</div>
                    <div className="">{link.description}</div>
                </Link>
            ))}
        </div>
    )
}

export default HistoryPage;