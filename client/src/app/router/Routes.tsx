import {createBrowserRouter} from "react-router"
import App from "../../App";
import Home from "../Home/Home";
import TestComponent from "../TestComponent/TestComponent";

export const route = createBrowserRouter([
    {
        path: '/game/:gameId',
        element: <App/>,
    },
    {
        path: '/',
        element: <Home/>,
    },{path: '/create', element: <TestComponent/>}
        
    
]);