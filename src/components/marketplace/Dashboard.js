import { React, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

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

    const navigate = useNavigate();

    const firebaseConfig = {
        apiKey: "AIzaSyAIN2TF5BrhNOvobAQFg0llhXsTXRRJwXo",
        authDomain: "worlds-capstone.firebaseapp.com",
        projectId: "worlds-capstone",
        storageBucket: "worlds-capstone.appspot.com",
        messagingSenderId: "245373342483",
        appId: "1:245373342483:web:3c645c460d222d0b76c0e6",
        measurementId: "G-P3CNWR4SD1"
        };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    var user = auth.currentUser;
    console.log(user.email);

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
            default:
                return <div>ERROR 404</div>
        }
    }

    const DrawerFunction = ( index ) => { setWindowId(index) }

    return (
        <div className="DashboardMainContainer">
            <DashboardDrawer changeWindow={DrawerFunction} signOut={signOutUser} userName={user.email.split('@')[0]}/>
            
            {
                renderWindow()
            }

        </div>
    )
}

export default Dashboard;