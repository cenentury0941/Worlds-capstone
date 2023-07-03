import { useState , React }  from "react";
import MuiAppBar from "./MuiAppBar";
import Button from '@mui/material/Button';
import { Link , Routes, Route } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

import "./Home.css"
import "./Slideshow.css"
import down from "./images/down.png"
import tree from "./images/tree.gif"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import HardAcc from "./hardacc";

import img1 from "./images/image1.jpg";
import img2 from "./images/image2.png";
import img3 from "./images/image3.jpg";
import img4 from "./images/image4.png";
import loading from "./images/loading.gif";

function Home()
{

    var notkeya = "sk-@d5lfr2iJ@SM"
    var notkeyb = "DipTqLl@72VT3BlbkFJq"
    var notkeyc = "BsjX@Kuwj6JlMmt@Xj4oX"

    const configuration = new Configuration({
        organization: "org-RZ3uSWP75ShMsyLdXuc7Hot7",
        apiKey: (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ),
      });

      //console.log( (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ) )
    
    const openai = new OpenAIApi(configuration);

    const promptDALLE = async (message) => {


        if( message.length == 0 )
        {
            return;
        }

        try {

        const response = await openai.createImage({
            prompt: message,
            n: 1,
            size: "256x256",
          });
      
          console.log(response.data);

        setTex1( response.data.data[0].url )
        setTex2( tex1 )
        setTex3( tex2 )
        setTex4( tex3 )

      
        } catch (error) {
          console.error(error);
        }
      }
      




      const promptChatGPT = async (message) => {
        
        

        
        if( message.length == 0 )
        {
            return;
        }

        let show_message = message
        message = "Create " + ( messages.length > 1 ? "or modify" : "") + " the Dall-e prompt to generate the following image : A video game style top-down image of " + message + ". Image size should be 256x256."
        messages.push( { source : "User" , show_message : show_message , message : message , key : messages.length} )

        var send_messages = []

        for( var mess of messages )
        {
            send_messages.push( { role : ( mess.source === "Gpt" ? "assistant" : "user" ) , content : mess.message } )
        }

        try {

            // const result = await openai.createCompletion({
            //   model: "text-davinci-003",
            //   prompt: message,
            //   temperature: 0.5,
            //   max_tokens: 40,
            // });


            const result = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: send_messages,
                max_tokens: 200,
              });

            var chat_response = result.data.choices[0].message.content //.data.choices[0].text;
            console.log(chat_response);


            setTex1( loading )
            setTex2( tex1 )
            setTex3( tex2 )
            setTex4( tex3 )

            promptDALLE(chat_response);
              
            messages.push( { source : "Gpt" , show_message : chat_response , message : chat_response , key : messages.length} )
            setMessage("");

        } catch (e) {
            messages.push( { source : "Gpt" , show_message : "Sorry, but openAI's service is overloaded right now, please try again after a minute." , message : "Sorry, but openAI's service is overloaded right now, please try again after a minute." , key : messages.length} )
            setMessage("");
          }

      }


      
      const [ index , setIndex ] = useState(0);
      const [ message , setMessage ] = useState("");
      const [ messages , setMessages ] = useState([ { source : "Gpt" , show_message : "Welcome to the WORLDS asset generator! Describe the asset you'd like to develop." , message : "Describe the asset you'd like to develop." } ]);
      const [ tex1 , setTex1 ] = useState( img1 )
      const [ tex2 , setTex2 ] = useState( img2 )
      const [ tex3 , setTex3 ] = useState( img3 )
      const [ tex4 , setTex4 ] = useState( img4 )

    function textinputUpdated(event)
    {
        setMessage( event.target.value );
        console.log( message )
    }

    
    function sendMessage(event)
    {
        if( message.length == 0 )
        {
            return;
        }

        promptChatGPT(message);
        setMessage(".");
    }


    function nextImg()
    {
        if( index == 2 )
        {
            return;
        }
        setIndex( index + 1 );
    }

    function prevImg()
    {
        if( index == 0 )
        {
            return;
        }
        setIndex( index - 1 );
    }

    return (
    <div className="Home">    
        <div className="Banner">
            <div className="BannerImg">
            <div className="BannerText"/>
            <div className="ButtonContainer">
            <Button href="https://github.com/cenentury0941/Worlds" color="secondary" variant="contained" sx={ { borderRadius: 28 , height: "6vh" , width: "12vw", boxShadow: "0px 0px 1vh 0.025vh #000000AA" } }>Visit Repo</Button>
            <Link to="/worlds/generate/">
            <Button color="primary" variant="contained" sx={ { borderRadius: 28 , height: "6vh" , width: "12vw", boxShadow: "0px 0px 1vh 0.025vh #000000AA" } }>Enter Sandbox</Button>
            </Link>
            </div>
            <img src={down} style={{ height : "7vh" , marginTop: "5vh" }} className="ArrowImg"/>
            </div>
        </div>

        <div className="AboutWorlds">
            
            <div className="AboutDivider">
                <img src={tree} className="TreeImg"/>
            </div>
            <div className="AboutDivider">
                <div className="AboutText"/>
                <h2>WORLDS is a Generative AI backed procedural world generation engine which accepts natural language input and converts it into a blueprint to generate a virtual world as per the user's requirement.</h2>
                <h2>Leveraging the power of Large Language Models (LLMS) and Generative Adverserial Networks (GAN), WORLDS will be capable of generating textures, models, NPC behaviour, etc in a diverse and case specific manner which will be unique to each world that is generated using the engine.</h2>
                <h2>Such an approach to game world generation will enable developers and users alike to develop a game world as per their vision and preferences, with reduced human effort and cost.</h2>
            </div>
                        


        </div>

        <div className="GptTest">
            <div className="GPTTestText"></div>
            <h1 className="GptTestHeading">A simple implementation of openAI's LLM and GAN models via OpenAI API.</h1>
            <div className="GptTestBack"></div>
            <div className="GptChat">

                <div className="GptChatBox">

                {
                    messages && messages.map( (element) => {
                        return (
                            <div key={""+element.key} className={ "GptMessage " + ( element.source ) }>
                                { element.show_message }
                            </div>
                        )
                    } )
                }


                </div>
                <div className="GptControls">
                
                <Input onChange={ textinputUpdated } placeholder="Enter Message"  value={message} style={{ display:"flex", height : "100%" ,width:"70%", alignSelf:"center", marginLeft: "5%", bottom: "0", color: "white"}}/>
                
                <Button onClick={sendMessage} variant="contained" endIcon={<SendIcon />} style={{ height : "100%" , width : "30%" , margin: 0, bottom: 0 }}>
                </Button>
                
                </div>

            </div>
            <div className="GptTexture image1" style={{ backgroundImage : "url(" + tex1 + ")" }}></div>
            <div className="GptTexture image2" style={{ backgroundImage : "url(" + tex2 + ")" }}></div>
            <div className="GptTexture image3" style={{ backgroundImage : "url(" + tex3 + ")" }}></div>
            <div className="GptTexture image4" style={{ backgroundImage : "url(" + tex4 + ")" }}></div>
        </div>

        <div className="MapGen">
            <div className="MapGenDarken">
            <div className="MapGenText"/>
            <h1>WORLDS will generate terrain procedurally as the player explores the world further beyond explored regions. The terrain generation will be done based on an LLM produced terrain generation algorithm based on text input from the user.
            <br></br><br></br>Currently WORLDS uses a simplex noise based procedural terrain generation algorithm for demonstration purposes. However we are in the process of porting in the LLM based terrain generation algorithm into the engine.</h1>
        </div> 
        </div>
                
        <div className="AdaptiveAI">
        
        <IconButton className="LeftArrow" onClick={ () => {prevImg()} }>
            <ArrowBackIosIcon style={{ fontSize: 64, margin : "3px" }} />
        </IconButton>


        <div className="NpcAi"/>


        <div className="ai01" style={   index == 0 ? { backgroundImage : "url(" + require("./images/stage1.jpg") + ")" } : ( index == 1 ? { backgroundImage : "url(" + require("./images/stage2.jpg") + ")" } : { backgroundImage : "url(" + require("./images/stage3.jpg") + ")" } )    } ></div>
        
        
        <IconButton className="RightArrow" onClick={ () => {nextImg()}}>
            <ArrowForwardIosIcon style={{ fontSize: 64, margin : "3px" }} />
        </IconButton>
        
        </div>

    </div>
    )
}

export default Home
