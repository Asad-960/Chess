import {createBrowserRouter} from "react-router"
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";


export const route = createBrowserRouter([
    {
        path: '/game/:gameId',
        element: <App/>,
    },
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
        
    
]);