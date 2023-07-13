import {auth} from "./firebase.js";

async function getMarketImages(user)
{
    return fetch("https://localhost:7037/marketImages" , {}).then( async (response) => {
        var json = await response.json();
        var filtered_json = json.filter( (i,n) => { console.log(n);return json[n].email !== user.email } );
        console.log( "FILTERED " , filtered_json  )
        return filtered_json;
    } )
}

async function getGalleryImages(user)
{
    return fetch("https://localhost:7037/galleryImages?email=" + user.email).then( async (response) => {
        var json = await response.json();
        return json;
    } )
}

async function addExternalImage(email, name , refer)
{
    return fetch("https://localhost:7037/addExternalImage?email=" + email + "&name=" + name + "&refer=" + refer ).then( async (response) => {
        var res = await response.text();
        return res;
    } )
}

export {addExternalImage, getMarketImages, getGalleryImages};