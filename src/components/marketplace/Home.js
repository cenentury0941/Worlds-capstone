import { useEffect , useState, React } from "react";

import { initializeApp } from "firebase/app";
import { getStorage, ref , listAll, getDownloadURL } from "firebase/storage";

import "./Dashboard.css";
import { auth } from "./firebase";
import {getMarketImages,getGalleryImages, removeExtImage } from "./db";
import MarketImageDetails from "./MarketImageDetails";
import GalleryImageDetails from "./GalleryImageDetails";

function Home(props)
{
    const [ marketImages , setMarketImages ] = useState(null);
    const [ galleryImages , setGalleryImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);
    const [ marketImageDetails , setMarketImageDetails ] = useState(null);
    const [ galleryImageDetails , setGalleryImageDetails ] = useState(null);

    const loadImages = async (user) => {
        console.log( "Loading..." )
        setMarketImages( (await getMarketImages(user)).slice(0,5) );
        setGalleryImages( (await getGalleryImages(user)).slice(0,5) );
    } 

    const removeImage = async ( ref) => {
        var res = await removeExtImage( auth.currentUser.email ,ref);
        console.log( "Image removal : " + res );
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

    const closeImageDetails = () => {
        setMarketImageDetails(null);
        setGalleryImageDetails(null);
    }

    return (
        <div className="DashboardWindow">
            <div className="DashboardHeading">Home</div>
            <div className="DashboardSubHeading">Your Gallery <u style={{fontSize:"75%", marginLeft:"63vw", color: "blue", cursor:"pointer"}} onClick={()=>{props.changeWindow(2)}}>view all</u></div>
            <div className="DashboardImageContainer">
            { galleryImages ? galleryImages.map((element)=>(<div key={element.ref} className="DashboardImage"  style={{height:"80%", width:"unset", backgroundImage:"url("+element.url+")"}}
            onClick={ () => {setGalleryImageDetails(element)} }
            >
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }</div>
            <div className="DashboardSubHeading">Market    <u style={{fontSize:"75%", marginLeft:"66vw", color: "blue", cursor:"pointer"}} onClick={()=>{props.changeWindow(3)}}>view all</u></div>
            <div className="DashboardImageContainer">
            { marketImages ? marketImages.map((element)=>(element.email != auth.currentUser.email && <div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")"}}
            onClick={ () => {setMarketImageDetails(element)} }
            >
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }
        </div>
        {marketImageDetails && <MarketImageDetails details={marketImageDetails} closeWindow={closeImageDetails} />}
        {galleryImageDetails && <GalleryImageDetails removeExternalImage={removeImage} details={galleryImageDetails} closeWindow={closeImageDetails} />}
        </div>
    )
}

export default Home;