import {createBrowserRouter} from "react-router"
import App from "../../App";
import Home from "../Home/Home";

export const route = createBrowserRouter([
    {
        path: '/game',
        element: <App/>,
    },
    {
        path: '/',
        element: <Home/>
    }
        
    
]);