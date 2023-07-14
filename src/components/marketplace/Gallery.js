import { useEffect , useState, React } from "react";
import { auth } from "./firebase";
import {getGalleryImages, removeExtImage} from "./db";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GalleryImageDetails from "./GalleryImageDetails";


function Gallery()
{
    
    const [ images , setImages ] = useState(null);
    const [ update , setUpdate ] = useState(0);
    const [ galleryImageDetails , setGalleryImageDetails ] = useState(null);

    const loadImages = async (user) => {
        console.log( "Loading..." )
        setImages( await getGalleryImages(user) );
    } 

    const reload = () => {
        console.log( "UseEffect : auth : " , auth )
        if(auth.currentUser)
        {
            loadImages(auth.currentUser);
        }
    }

    useEffect( () => {
        console.log( "UseEffect : auth : " , auth )
        if(auth.currentUser)
        {
            loadImages(auth.currentUser);
        }
      }, [auth.currentUser]);

    useEffect( () => {
    console.log( " IMAGES :  " , images ); 
    }, [ images ]);


    const removeImage = async ( ref) => {
        var res = await removeExtImage( auth.currentUser.email ,ref);
        console.log( "Image removal : " + res );
    }   

    const closeImageDetails = () => {
        setGalleryImageDetails(null);
    }
    
    const removeExternalImage = async ( ref) => {
        var res = await removeExtImage( auth.currentUser.email ,ref);
        console.log( "Image removal : " + res );
    } 

    return (
        <div className="DashboardWindow">
        <div className="DashboardHeading">Gallery</div>
        <div className="ButtonContainer" style={{backgroundColor:"#00000000"}}>
            <TextField variant="outlined" color="primary" style={{margin:"10px" , maxWidth:"75%", backgroundColor:"white"}} fullWidth placeholder="AI Search by tags" id="fullWidth" />
            <Button variant="contained" style={{height:"70%", aspectRatio:"3"}}>Search</Button>
        </div>
        <div className="MarketImageContainer">
            { images ? images.map((element, index)=>(<div sameUser={element.email === auth.currentUser.email} removeExternalImage={removeExtImage} email={auth.currentUser.email} key={element.ref} className="DashboardImage" style={{backgroundImage:"url("+element.url+")" , animationDelay:""+(index*0.039)+"s"}}
            onClick={ () => {setGalleryImageDetails(element)} }
            >
                <h5>{element.name}</h5>
            </div>)) : <div>LOADING</div> }
        </div>
        {galleryImageDetails && <GalleryImageDetails reloadImages={reload} removeExternalImage={removeImage} details={galleryImageDetails} closeWindow={closeImageDetails} />}
        </div>
    )
}

export default Gallery;