import { React , useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { deleteImage } from "./db";

import { auth } from "./firebase";

import { toggleAccessibility } from "./db";

import "./ImageDetails.css"

function GalleryImageDetails({ reloadImages, sameUser, email, user , details , closeWindow , removeExternalImage})
{
    const [ access , setAccess ] = useState(details.accessibility);

    const deleteImg = async () => {
        var res = await deleteImage(details.ref);
        if( res )
        {
            reloadImages();
            closeWindow();
        }
    }

    const toggleAccess = async () => {
        var res = await toggleAccessibility( details.ref , access);
        console.log(res)
        if( res )
        {
            console.log( "Accessibility Updated " , access , typeof access )
            setAccess( access === 1 ? 0 : 1 );
            reloadImages()
        }
    }

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
            <h3>Accessibility : { access === 1 ? "Public" : "Private"}</h3>
            
            { auth.currentUser.email===details.email &&
            <div className="ButtonContainer">
                <Button variant="outlined" onClick={toggleAccess}>TOGGLE ACCESSIBILITY</Button>
                <Button variant="outlined" color="error" onClick={deleteImg} >DELETE IMAGE</Button>
            </div>
            }

            { auth.currentUser.email!==details.email &&
                <div className="ButtonContainer" onClick={ () => { removeExternalImage( details.ref ) } }>
                <Button variant="outlined" onClick={ () => { reloadImages(); closeWindow() } }>Remove from Gallery</Button>
                </div>  
            }


            </div>
        </div>
    </div>
    )
}

export default GalleryImageDetails;