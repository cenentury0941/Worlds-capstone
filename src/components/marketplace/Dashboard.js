import { useState , React } from "react";

import DashboardDrawer from "./DashboardDrawer";
import Home from "./Home";
import Gallery from "./Gallery";
import Generate from "./Generate";
import Market from "./Market";

import "./Dashboard.css";
import { Toolbar } from "@mui/material";

function Dashboard(){

    const HOME = 0 , GENERATE = 1 , GALLERY = 2 , MARKET = 3 ; 
    const [ windowId , setWindowId ] = useState(HOME);

    const renderWindow = () => {
        switch( windowId )
        {
            case HOME:
                return <Home />
                break;
            case GENERATE:
                return <Generate />
                break;
            case GALLERY:
                return <Gallery />
                break;
            case MARKET:
                return <Market />
                break;
            default:
                return <div>ERROR 404</div>
        }
    }

    const DrawerFunction = ( index ) => { setWindowId(index) }

    return (
        <div className="DashboardMainContainer">
            <DashboardDrawer changeWindow={DrawerFunction} />
            
            {
                renderWindow()
            }

        </div>
    )
}

export default Dashboard;