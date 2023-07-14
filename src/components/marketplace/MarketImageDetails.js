import { React , useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { auth } from "./firebase";

import { addExternalImage } from "./db";

import "./ImageDetails.css"

function MarketImageDetails({ user, details , closeWindow , removeImage })
{
    const [ email , setEmail ] = useState("")

    useEffect( () => {
        if(auth.currentUser)
        {
            setEmail(auth.currentUser.email);
        }
    } , [auth.currentUser] )

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
            <div className="ButtonContainer" onClick={ () => { console.log("Added : ", details.name , details.ref) ; addExternalImage( email , details.name , details.ref ) ; removeImage && removeImage(details.ref) } }>
                <Button variant="outlined">Add to Gallery</Button>
            </div>            
            </div>
        </div>
    </div>
    )
}

export default MarketImageDetails;