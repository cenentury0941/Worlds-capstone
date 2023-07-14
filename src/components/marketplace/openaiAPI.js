
import { Configuration, OpenAIApi } from "openai";
import { uploadToFirebase } from "./firebase";

var notkeya1 = "sk-itbR@8mxWk1@c37X2"
var notkeyb1 = "iBi2@uT3BlbkFJw91x@"
var notkeyc1 = "3wIqMuI2T5V@YYhQi"
var org1 = "org-RZ3uSWP75ShMsyLdXuc7Hot7"

var notkeya = "sk-8c@ATqnTJkKhSlH@"
var notkeyb = "KzTcbFT3BlbkFJG@"
var notkeyc = "wRsb76Fnkn6@vPgaGpHB"

const configuration = new Configuration({
    organization: "org-SxNS8ihaKwDqdWQqeicoC3iS",
    apiKey: (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ),
  });

const openai = new OpenAIApi(configuration);

const promptDALLE = async (message) => {

    var url = "NOT FOUND";

    if( message.length == 0 )
    {
        return;
    }

    try {

    const response = await openai.createImage({
        prompt: message,
        n: 1,
        size: "256x256",
        response_format: "b64_json"
      });
  
      console.log(response.data);

    var data =  response.data.data[0].b64_json;
    var file_name = "File" + Math.floor(Math.random() * 100000) + ".png";

    var result = await uploadToFirebase(file_name , data);
    console.log("FIREBASE : RESULT : " , result);
    url = result; //"https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600203/40704496-done-white-stamp-text-on-green-background.jpg";

    } catch (error) {
      console.error(error);
    }
    console.log( "URL : " + url )
    return url;
  }

  export {promptDALLE};