import React from "react";
import "./MarketPlaceLandscape.css"; 
import Button from '@mui/material/Button';
import { Link , Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth ,onAuthStateChanged} from "firebase/auth";


function Landing(){

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
    
        // Initialize Firebase
    var app = initializeApp(firebaseConfig);
    var auth = getAuth();

    setTimeout(
        () => {
            var user = auth.currentUser;
            console.log(user);
            if (user) {
                navigate("/worlds/marketplace/dashboard")
            } else {
                console.log("Not logged in")
            }
        },
        50
    );


    return (
        <div className="MainContainer SlideshowBackground">
            <div className="SubContainer Landing01">
                <div className="LandingTitle"></div>
                <h2 className="LandingSubtitle">Welcome to Worlds Marketplace,<br/>A place where you can store, browse and share texture assets generated using the Worlds Texture Generator!</h2>
            
                <div className="ButtonFlex">
                <Link to="/worlds/marketplace/signin">
                <Button color="secondary" variant="contained" sx={ { borderRadius: 28 , height: "6vh" , width: "12vw", boxShadow: "0px 0px 1vh 0.025vh #000000AA" , backgroundColor: "#fff" } }>Sign In</Button>
                </Link>
                <Link to="/worlds/marketplace/signup">
                <Button color="secondary" variant="contained" sx={ { borderRadius: 28 , height: "6vh" , width: "12vw", boxShadow: "0px 0px 1vh 0.025vh #000000AA" } }>Sign Up</Button>
                </Link>
                </div>
                
            </div>
        </div>
    );
}

export default Landing;