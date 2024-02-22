import { useContext } from "react";
import NavigationContext from "./navigation";

function useNavigation(){
    return useContext(NavigationContext);
}

export default useNavigation;