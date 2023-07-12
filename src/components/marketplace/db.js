import {auth} from "./firebase.js";

async function getMarketImages()
{
    return fetch("https://localhost:7037/marketImages" , {}).then( async (response) => {
        var json = await response.json();
        return json;
    } )
}

async function getGalleryImages(user)
{
    return fetch("https://localhost:7037/galleryImages?email=" + user.email).then( async (response) => {
        var json = await response.json();
        return json;
    } )
}

export {getMarketImages, getGalleryImages};