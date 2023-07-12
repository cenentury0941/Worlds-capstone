import { useEffect , useState, React } from "react";

import {getMarketImages} from "./db";


function Market()
{

    const [ images , setImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);

    const loadImages = async () => {
        console.log( "Loading..." )
        setImages( await getMarketImages() );
    } 

    useEffect( () => {
        loadImages();
      }, []);

    useEffect( () => {
    console.log( " IMAGES :  " , images ); 
    setUpdate( update + 1 );
    }, [ images ]);


    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Market</div>
        <div className="MarketImageContainer">
            { images ? images.map((element)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")"}}>
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }
        </div>
        </div>
    )
}

export default Market;