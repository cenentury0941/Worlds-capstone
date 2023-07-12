import { useEffect , useState, React } from "react";
import { auth } from "./firebase";
import {getGalleryImages} from "./db";


function Gallery()
{
    
    const [ images , setImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);

    const loadImages = async (user) => {
        console.log( "Loading..." )
        setImages( await getGalleryImages(user) );
    } 

    useEffect( () => {
        if(auth.currentUser)
        {
            loadImages(auth.currentUser);
        }
      }, [auth.currentUser]);

    useEffect( () => {
    console.log( " IMAGES :  " , images ); 
    setUpdate( update + 1 );
    }, [ images ]);


    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Gallery</div>
        <div className="MarketImageContainer">
            { images ? images.map((element)=>(<div key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")"}}>
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }
        </div>
        </div>
    )
}

export default Gallery;