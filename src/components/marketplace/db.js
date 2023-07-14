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

async function addImage(email, name , prompt, tags, url)
{
    return fetch("https://localhost:7037/addImage?email=" + email + "&name=" + name + "&prompt=" + prompt + "&tags=" + tags + "&url=" + url    ).then( async (response) => {
        var res = await response.json();
        return res["result"];
    } )
}

async function toggleAccessibility(refer , access)
{
    var response = await fetch("https://localhost:7037/toggleAccessibility?refer=" + refer + "&access=" + ( access === 1 ? 0 : 1 ) );
    var res = await response.json();
    console.log(res)
    return res["result"];
    
}

async function removeExtImage(email , ref)
{
    var response = await fetch("https://localhost:7037/removeExtImage?email=" + email + "&refer=" + ref );
    var res = await response.json();
    console.log(res)
    return res["result"];
    
}

async function deleteImage(ref)
{
    var response = await fetch("https://localhost:7037/deleteImage?refer=" + ref );
    var res = await response.json();
    console.log(res)
    return res["result"];
    
}

export {deleteImage,removeExtImage, toggleAccessibility, addImage , addExternalImage, getMarketImages, getGalleryImages};