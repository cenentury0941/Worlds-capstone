import React from "react";

import './GameWindow.css'

function GameWindow(props)
{

    var url = "https://cenentury0941.github.io/game?setting="+props.data.setting+"&weather="+props.data.weather+"&elevation="+props.data.elevation

    return (<div className="GameWindow">
        <iframe title="worlds" src={url} width={"100%"} height={"100%"} ></iframe>
    </div>)
}

export default GameWindow