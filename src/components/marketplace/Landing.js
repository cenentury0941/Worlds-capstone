import React from "react";
import "./MarketPlaceLandscape.css"; 
import Button from '@mui/material/Button';
import { Link , Routes, Route } from "react-router-dom";

function Landing(){
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