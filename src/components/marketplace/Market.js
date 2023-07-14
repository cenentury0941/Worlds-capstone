import { useEffect , useState, React } from "react";

import {getMarketImages} from "./db";
import MarketImageDetails from "./MarketImageDetails";
import { auth } from "./firebase";

import { AISearchByTags } from "./openaiAPI";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

var query = "";

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

    const removeImage = (ref) => {
        
    }

    const TagSearch = async () => {
        console.log("QUERY : " + query);
        var results = await AISearchByTags(query);
        console.log( "AI FILTERED : " , results );
        setImages(results);
    }

    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Market</div>
        <div className="ButtonContainer" style={{backgroundColor:"#00000000"}}>
            <TextField onChange={ (event) => { query = event.target.value; console.log(query) } } variant="outlined" color="primary" style={{margin:"10px" , maxWidth:"75%", backgroundColor:"white"}} fullWidth placeholder="AI Search by tags" id="fullWidth" />
            <Button onClick={TagSearch} variant="contained" style={{height:"70%", aspectRatio:"3"}}>Search</Button>
        </div>
        <div className="MarketImageContainer">
            { images ? images.map((element,index)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")" , animationDelay:""+(index*0.039)+"s"}}
            onClick={ () => {setMarketImageDetails(element)} }
            >
                <h5>{element.name}</h5>
            </div>)) : <div style={{position:"absolute", alignSelf:"center", left:"50%"}}>LOADING</div> }
        </div>
        {marketImageDetails && <MarketImageDetails removeImage={removeImage} user={auth.currentUser} details={marketImageDetails} closeWindow={closeImageDetails} />}
        </div>
    )
}

export default Market;