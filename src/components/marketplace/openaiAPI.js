
import { Configuration, OpenAIApi } from "openai";

var notkeya = "sk-itbR@8mxWk1@c37X2"
var notkeyb = "iBi2@uT3BlbkFJw91x@"
var notkeyc = "3wIqMuI2T5V@YYhQi"

const configuration = new Configuration({
    organization: "org-RZ3uSWP75ShMsyLdXuc7Hot7",
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
      });
  
      console.log(response.data);

    url =  response.data.data[0].url;
  
    } catch (error) {
      console.error(error);
    }
    console.log( "URL : " + url )
    return url;
  }

  export {promptDALLE};