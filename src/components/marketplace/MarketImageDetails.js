import React from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { addExternalImage } from "./db";

import "./ImageDetails.css"

function MarketImageDetails({ user, details , closeWindow })
{
    return (
    <div className="ImageDetailsBG">
        <div className="ImageDetailsContainer">
            <div className="CloseButtonContainer">
            <IconButton onClick={closeWindow} aria-label="close">
                <CloseIcon />
            </IconButton>
            </div>
            <div className="ContainerPartition">
                <img src={details.url}></img>
            </div>
            <div className="ContainerPartition">
            <h2>Image Details</h2>
            <h3>Name : {details.name}</h3>
            <h3>Owner : {details.email}</h3>
            <h3>Date Created : {details.created.split("T")[0]}</h3>
            <h3>Prompt : {details.prompt}</h3>
            <div className="ButtonContainer" onClick={ () => { console.log("Added : ", user.email , details.name , details.ref) ; addExternalImage( user.email , details.name , details.ref ) } }>
                <Button variant="outlined">Add to Gallery</Button>
            </div>
            </div>
        </div>
    </div>
    )
}

export default MarketImageDetails;