import useNavigation from "../hooks/use-navigation";
import "../styles.css"
function Link({ to, children, className, activeClassName }){
    const { navigate } = useNavigation();
    
    const handleClick = (event) => {
        if(event.metaKey || event.ctrlKey){
            return;
        }
        event.preventDefault();
        navigate(to);
    };

    return (
        <a href={to} onClick={handleClick}>{children}</a>
    )
}

export default Link;