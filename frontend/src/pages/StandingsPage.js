import Link from "../components/Link";
import NavLinks from "../content/NavLinks";

function StandingsPage() {

    const { seasons } = NavLinks();

    seasons.sort((a,b) => b.season - a.season);
    return (
        <div className="standingsPageGrid">
            {seasons && 
                seasons.map((season) => (
                    // <div key={season._id}>{season.season}</div>
                    <Link key={season._id} to={`/standings/${season.season}`} className="historyPageCard">
                        <h2 className="">{season.season}</h2>
                    </Link>
                ))
            }
        </div>
    )
}

export default StandingsPage;