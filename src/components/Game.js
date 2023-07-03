import React from "react";
import { useSearchParams } from "react-router-dom";
import GameWindow from "./GameWindow";
import "./Game.css"

function Game(props)
{
    const [searchParams, setSearchParams] = useSearchParams();

    return (<div className="GameBG">      
        <GameWindow data={{ setting : searchParams.get("setting") , weather : searchParams.get("weather") , elevation : searchParams.get("elevation")}} />
    </div>)
}

export default Game
