import Link from "../components/global/Link";
import NavLinks from "../content/NavLinks";

function StandingsPage() {

    const { seasons } = NavLinks();

    seasons.sort((a,b) => b.season - a.season);
    return (
        <div >
            <div className="standingsPageHeader">Standings</div>
            {seasons && 
                <div className="standingsPage">
                    {seasons.map((season) => (
                        // <div key={season._id}>{season.season}</div>
                        <Link key={season._id} to={`/standings/${season.season}`} className="historyPageCard">
                            <h2 className="">{season.season}</h2>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default StandingsPage;