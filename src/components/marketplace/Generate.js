import { React , useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { promptDALLE } from "./openaiAPI";

import "./Generate.css"


function Generate()
{
    const [ imageURL , setImageURL ] = useState("url(" + require("./images/imageIcon.png") + ")");
    var prompt = "" ;

    const generateImage =  async () => {
        setImageURL( "url(" + require("./images/Loading_icon.gif") + ")" );
        var url = await promptDALLE( prompt );
        setImageURL( "url(" + url + ")" );
    }

    const updatePrompt = (event) => {
        prompt = event.target.value;
        console.log("PROMPT : " , prompt);
    }


    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Generate</div>
                <div className="GenerateBody">
                        <div className="GenerateBodyRowPartition">
                        <div className="GenerateImageLoading"></div>
                        <div className="GenerateImage" style={{backgroundImage:imageURL}}></div>
                        </div>
                        <div className="GenerateBodyRowPartition">
                        <h2>Generate Image</h2>
                        <h3>Prompt : </h3>
                        <TextField onChange={updatePrompt} style={{margin:"10px" , maxWidth:"90%"}} fullWidth placeholder="Ex : 256x256 top-down grass texture" id="fullWidth" />
                        <div className="GenerateButtonContainer" onClick={ () => {  } }>
                        <Button onClick={generateImage} variant="outlined">Generate Image</Button>
                        </div>
                        </div>
                </div>
            </div>
    )
}

export default Generate;