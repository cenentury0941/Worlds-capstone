import { React , useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { promptDALLE } from "./openaiAPI";
import {addImage} from "./db.js";
import { auth } from "./firebase";
import { uploadToFirebase } from "./firebase";

import "./Generate.css"
import { Widgets } from "@mui/icons-material";


var email = "";
var rawUrl = "";
var save_prompt = "" ;
var prompt = "" ;
var file_name = "" ;
var tags = "" ;

function Generate()
{
    const [ imageURL , setImageURL ] = useState("url(" + require("./images/imageIcon.png") + ")");
    const [ imageLoaded , setImageLoaded ] = useState(false);
    const [ saveImage , setSaveImage ] = useState(false);


    setTimeout( () => {
        email = auth.currentUser.email;
        console.log( "GENERATE : EMAIL : " , email );
    } , 1000 );

    const generateImage =  async () => {
        save_prompt = prompt;
        setImageURL( "url(" + require("./images/Loading_icon.gif") + ")" );
        var url = await promptDALLE( prompt );
        if( url === "NOT FOUND" )
        {
            setImageLoaded(false);
        }
        else
        {
            rawUrl = url;
            setImageURL( "url(" + url + ")" );
            setImageLoaded(true);
        }
    }

    const updatePrompt = (event) => {
        prompt = event.target.value;
        console.log("PROMPT : " , prompt);
    }

    const saveImageHandler = async (event) => {
        return await addImage(email,file_name,save_prompt,tags,rawUrl);
    }

    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Generate</div>
                <div className="GenerateBody">
                        <div className="GenerateBodyRowPartition">
                        <div className="GenerateImageLoading"></div>
                        <div className="GenerateImage" style={{backgroundImage:imageURL}}></div>
                        </div>
                        <div className="GenerateBodyRowPartition"  style={{ justifyContent:"start", flexDirection:"row" }}>
                        
                        <div className="GenerateBodyRowPartition" style={{width:"100%",  transform: ( saveImage ? "translateX(-100%)" : "translateX(0%)" )}}>
                        <h2>Generate Image</h2>
                        <h3>Prompt : </h3>
                        <TextField onChange={updatePrompt} style={{margin:"10px" , maxWidth:"90%"}} fullWidth placeholder="Ex : 256x256 top-down grass texture" id="fullWidth" />
                        <div className="GenerateButtonContainer">
                        <Button onClick={generateImage} variant="contained" color="info">Generate Image</Button>
                        <Button onClick={() => { imageLoaded && setSaveImage(true) }} variant="contained" color={ imageLoaded ? "success" : "error" }>Save Image</Button>
                        </div>
                        </div>
                        <div className="GenerateBodyRowPartition" style={{width:"100%",  transform: ( saveImage ? "translateX(-100%)" : "translateX(0%)" )}}>
                       
                        <h2>Save Image</h2>
                        <h3>Image Name : </h3>
                        <TextField onChange={ (event) => { file_name = event.target.value ; console.log( "FILE_NAME : " , file_name ) } } style={{margin:"10px" , maxWidth:"90%"}} fullWidth placeholder="Image Name"  />
                       
                        <h3>Tags : </h3>
                        <TextField onChange={ (event) => { tags = event.target.value ; console.log( "TAGS : " , tags ) } } style={{margin:"10px" , maxWidth:"90%"}} fullWidth placeholder="tag1,tag2,tag3..." />
                        <div className="GenerateButtonContainer">
                        <Button onClick={() => { imageLoaded && saveImageHandler() && setSaveImage(false) }} variant="contained" color="success">Save Image</Button>
                        </div>
                        
                        </div>

                        </div>
                </div>
            </div>
    )
}

export default Generate;