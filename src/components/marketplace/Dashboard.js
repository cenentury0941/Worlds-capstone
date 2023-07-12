import { React, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref , listAll, getDownloadURL } from "firebase/storage";

import DashboardDrawer from "./DashboardDrawer";
import Home from "./Home";
import Gallery from "./Gallery";
import Generate from "./Generate";
import Market from "./Market";

import { auth } from "./firebase";

import "./Dashboard.css";
import { Toolbar } from "@mui/material";

var completed = 0;

function Dashboard(){

    const HOME = 0 , GENERATE = 1 , GALLERY = 2 , MARKET = 3 , LOADING = 4; 
    const [ windowId , setWindowId ] = useState(HOME);
    

    const navigate = useNavigate();

    const user = auth.currentUser;
    
    if(!user)
    {
        navigate("/worlds/marketplace/");
    }

    const signOutUser = () => {

    signOut(auth).then(() => {
        navigate("/worlds/marketplace/");
    }).catch((error) => {
        console.log(error)
    });
    
    }

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
            case LOADING:
                return <div style={{ backgroundColor : "black" , height : "100%" , width : "100%" }}></div>
                break;
            default:
                return <div>ERROR 404</div>
        }
    }

    const DrawerFunction = ( index ) => { setWindowId(index) }

    return (
        <div className="DashboardMainContainer">
            <DashboardDrawer changeWindow={DrawerFunction} signOut={signOutUser}/>
            
            {
                renderWindow() 
            }

        </div>
    )
}

export default Dashboard;