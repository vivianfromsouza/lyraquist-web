// /* eslint-disable @typescript-eslint/no-explicit-any */
// // Worked on by: Ashley Bickham and Siri Avula
// // TODO: FIX THIS FILE FOR NEW CONFIG
// import { setupURLPolyfill } from "react-native-url-polyfill"
// import axios from 'axios';
// // import { APIKeys } from "../APIKeys";

// // setup syntax for URLs for API Call
// setupURLPolyfill();

// const TranslationService = {
  
//     // detects language and returns language code as a string
//     async detectLanguage(text) : Promise<string> {
//       if (text === undefined || text == ""){return ""}
//       // to hold language value
//       let lang;

//       // setting up API call, text is text to be TLed
//       const encodedParams = new URLSearchParams();
//       encodedParams.set('text', text);

//       const options = {
//         method: 'POST',
//         url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/detect-language',
//         headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'X-RapidAPI-Key': APIKeys.TLKey,
//           'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
//         },
//         data: encodedParams,
//       };

//       // attempts API call and grabs language code detected
//       try {
//         const response = await axios.request(options);
//         lang = response.data.source_lang_code;
//       } catch (error) {
//         console.error("error Detecting Lang: " + error);
//       }

//       return lang;
//     },

//     /*translates <text> from language <from> (what lang <text> is initially in) into language <into>
//     */
//     async translateFRINTO(text, from, into) : Promise<string> {
//       if ( text === undefined || text == "" || from === undefined || from == "" || into === undefined || into == ""){return ""}

//       // holds the translation
//       let TLed;

//       // only runs translation call when <from> language has been provided and <from> != <into>
//       if (from != into && from != '') {
//         // setting up API call
//         const encodedParams = new URLSearchParams();
//         encodedParams.set('from', from );
//         encodedParams.set('to', into );
//         encodedParams.set('text', text);
//         const options = {
//         method: 'POST',
//         url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': APIKeys.TLKey,
//             'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
//         },
//         data: encodedParams,
//         };

//         // makes API call and parses translation from json response
//         try {
//             const response = await axios.request(options);
//             TLed = response.data.trans;
//         } catch (error : any) {
//             console.error('ERROR TL FRINTO: ' +error);
//             TLed = 'ERROR: ' + error.response.status;
//         }
//       }
//       // when language you want to translate <from> and <into> are the same, do not need to translate the text
//       else{
//         TLed = text;
//       }

//       return TLed;
//     },

//     /*translates without being told from what language to translate from
//     only used with large chunks of text like lyrics
//     */
//     async translateAuto(text, into) : Promise<string> {
//       if ( text === undefined || text == "" || into === undefined || into == ""){return ""}
//       // holds the translation
//       let TLed;

//       // setting up API call
//       const encodedParams = new URLSearchParams();
//       encodedParams.set('from', 'auto' );
//       encodedParams.set('to', into);
//       encodedParams.set('text', text);
//       const options = {
//       method: 'POST',
//       url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
//       headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'X-RapidAPI-Key': APIKeys.TLKey,
//           'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
//       },
//       data: encodedParams,
//       };

//       // makes API call and parses translation from JSON response
//       try {
//         const response = await axios.request(options);
//         TLed = response.data.trans;
//       } catch (error: any) {
//           console.error("ERROR from TLAuto: "+ error);
//           TLed = 'ERROR: ' + error.response.status
//       }
//     return TLed;
//   },

// }

// export default TranslationService;