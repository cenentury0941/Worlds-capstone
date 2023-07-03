import {useState, React } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import "./Generate.css"
import ResponsiveDialog from "./alert";

function Generate()
{
    const navigate = useNavigate()

    let disabled = "error";
    const [index , setIndex ] = useState(0); 
    const [setting, setSetting] = useState(null);
    const [weather, setWeather] = useState(null);
    const [elevation, setElevation] = useState(10);

    const handleSettingChange = (event) => {
      setSetting(event.target.value);
    };
    const handleWeatherChange = (event) => {
      setWeather(event.target.value);
    };

    function generate()
    {
        if( weather && setting && elevation )
        {
            navigate( "/worlds/game?setting=" +setting+ "&weather=" +weather+ "&elevation=" + elevation );
        }
    }

    function next()
    {
        if(index >= 3){
            setIndex( 3 );
            return;
        }
        setIndex( index+1 );
        console.log( index )
    }

    function prev()
    {
        if(index <= 0){
            setIndex( 0 );
            return;
        }
        setIndex( index-1 );
        console.log( index )
    }


    disabled = (elevation && setting && weather) ? "success" : "error";

    return (<div className="Generate">
        <div className="GeneratePanel">
            <div className="GenText"/>
            <div className="SandboxSlider" style={{ transform: "translateX( " + index*-100 + "% )" }}>
                <div className="SandboxCard Lore">
                    <h1 style={{color : "white", textAlign: "left", fontWeight: "lighter" }}>The sandbox demo of WORLDS is a small game set in a post-apocalyptic world where the population has turned into mutants who attack people on sight.
                    <br/><br/>
                    The game is centered around the fight for survival as the player combats other players as well as NPCs while scavenging resources.
                    <br/><br/>
                    The game demostrates the functionality of a procedurally generated map built based on text parameters passed to the game engine.</h1>
                </div>
                <div className="SandboxCard Controls"></div>
                <div className="SandboxCard Ue"></div>
                <div className="SandboxCard">
                <div className="Gen">

                <h1 style={{color : "#393939", fontSize: "4vh" , width: "100%" , textAlign: "center", fontWeight: "lighter", margin: 0 }}>Generation Parameters</h1>

                <div>
                <FormControl sx={{ m: 1, width: "21vw" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Setting</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={setting}
                    onChange={handleSettingChange}
                    label="Setting"
                    >
                    <MenuItem value={"Wilds"}>Wilds</MenuItem>
                    <MenuItem value={"City"}>City</MenuItem>
                    </Select>
                </FormControl>

                </div>
                
                <div>
                <FormControl sx={{ m: 1, width: "21vw" }}>
                    <InputLabel id="demo-simple-select-autowidth-label2">Weather</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label2"
                    id="demo-simple-select-autowidth"
                    value={weather}
                    onChange={handleWeatherChange}
                    label="Weather"
                    >
                    <MenuItem value={"Clear"}>Clear</MenuItem>
                    <MenuItem value={"Snow"}>Snow</MenuItem>
                    </Select>
                </FormControl>
                </div>
                

                <h1 style={{color : "#393939", textAlign: "left", fontWeight: "lighter", margin: "-5%", fontSize: "2.5vh" }}>Elevation</h1>

                <Slider
                aria-label="Elevation"
                defaultValue={elevation}
                getAriaValueText={setElevation}
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={39}
                style={{ width: "20vw" }}
                />            

                <Button onClick={generate} variant="contained" style={{ width: "25vh", height: "5vh", marginTop : "3vh"}} color={disabled}  >
                     { ( disabled === "success" ) ? "Generate World" : "Select Params" }
                    </Button>
                
                <ResponsiveDialog />
                </div>


                </div>
            </div>
            <IconButton className="RightArrow" onClick={ () => { next() } } style={{position:"absolute", top:"90%" , left:"85%", aspectRatio:"1", height:"7vh", backgroundColor:"#393939", boxShadow:"0px 0px 1vh 0.1vh black"}}>
            <ArrowForwardIosIcon color="secondary"/>
            </IconButton>

            <IconButton className="RightArrow" onClick={ () => { prev() } } style={{position:"absolute", top:"90%" , right:"85%", aspectRatio:"1", height:"7vh", backgroundColor:"#393939", boxShadow:"0px 0px 1vh 0.1vh black"}}>
            <ArrowBackIosIcon color="secondary"/>
            </IconButton>

        </div>
    </div>)
}

export default Generate
