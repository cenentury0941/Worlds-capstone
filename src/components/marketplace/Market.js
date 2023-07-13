import { useEffect , useState, React } from "react";

import {getMarketImages} from "./db";
import MarketImageDetails from "./MarketImageDetails";
import { auth } from "./firebase";

function Market()
{

    const [ images , setImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);
    const [ marketImageDetails , setMarketImageDetails ] = useState(null);

    const loadImages = async (user) => {
        console.log( "Loading..." )
        setImages( await getMarketImages(user) );
    } 

      useEffect(() => {
        setTimeout( () => {
        if(auth.currentUser)
        {
            console.log("Init user valid")
            loadImages(auth.currentUser);
        }}, 250 
        )

    }, []);

    useEffect( () => {
    console.log( " IMAGES :  " , images );
    }, [ images ]);
    
    const closeImageDetails = () => {
        setMarketImageDetails(null);
    }

    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Market</div>
        <div className="MarketImageContainer">
            { images ? images.map((element,index)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")" , animationDelay:""+(index*0.039)+"s"}}
            onClick={ () => {setMarketImageDetails(element)} }
            >
                <h5>{element.name}</h5>
            </div>)) : <div style={{position:"absolute", alignSelf:"center", left:"50%"}}>LOADING</div> }
        </div>
        {marketImageDetails && <MarketImageDetails user={auth.currentUser} details={marketImageDetails} closeWindow={closeImageDetails} />}
        </div>
    )
}

export default Market;