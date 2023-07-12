import { useEffect , useState, React } from "react";

import { initializeApp } from "firebase/app";
import { getStorage, ref , listAll, getDownloadURL } from "firebase/storage";

import "./Dashboard.css";
import { auth } from "./firebase";
import {getMarketImages,getGalleryImages} from "./db";

function Home(props)
{
    const [ marketImages , setMarketImages ] = useState(null);
    const [ galleryImages , setGalleryImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);

    const loadImages = async (user) => {
        console.log( "Loading..." )
        setMarketImages( (await getMarketImages()).slice(0,5) );
        setGalleryImages( (await getGalleryImages(user)).slice(0,5) );
    } 


    
    useEffect(() => {
        console.log("Init Effect" , auth)
        setTimeout( () => {
        if(auth.currentUser)
        {
            console.log("Init user valid")
            loadImages(auth.currentUser);
        }}, 1000
        )

    }, []);

    useEffect( () => {
    console.log( " IMAGES :  " , marketImages ); 
    setUpdate( update + 1 );
    }, [ marketImages ]);


    return (
        <div className="DashboardWindow">
            <div className="DashboardHeading">Home</div>
            <div className="DashboardSubHeading">Your Gallery</div>
            <div className="DashboardImageContainer">
            { galleryImages ? galleryImages.map((element)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")"}}>
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }</div>
            <div className="DashboardSubHeading">Market</div>
            <div className="DashboardImageContainer">
            { marketImages ? marketImages.map((element)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")"}}>
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }
        </div>
        </div>
    )
}

export default Home;