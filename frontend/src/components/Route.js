import useNavigation from "../hooks/use-navigation";

function Route({ path, children }){
    const { currentPath } = useNavigation();

    if(path === currentPath){
        return children;
    } 
    return null;
}

export default Route;


// // GPT Code
// // Route.js
// import { useEffect, useState } from 'react';
// import useNavigation from '../hooks/use-navigation';

// function Route({ path, children }) {
//     const { currentPath } = useNavigation();
//     const [matches, setMatches] = useState(false);
//     const [params, setParams] = useState({});

//     useEffect(() => {
//         const pathMatch = currentPath.startsWith(path) || path === '*';
//         setMatches(pathMatch);

//         if (pathMatch) {
//             const pathSegments = path.split('/');
//             const currentPathSegments = currentPath.split('/');
//             const routeParams = {};

//             for (let i = 0; i < pathSegments.length; i++) {
//                 if (pathSegments[i].startsWith(':')) {
//                     const paramName = pathSegments[i].slice(1);
//                     routeParams[paramName] = currentPathSegments[i];
//                 }
//             }

//             setParams(routeParams);
//         }
//     }, [currentPath, path]);

//     if (typeof children === 'function') {
//         return matches ? children(params) : null;
//     } else {
//         return matches ? children : null;
//     }
// }

// export default Route;
