import axios from "axios";

// //This service handles queries and responses to Lexicala API which will pull word definitions and tentativey words' part of speech (POS)
const DictionaryService = {
  async getDefinition(word, toLang?) {

    const fromLang = eld.detect(word).language;
    if (
      word === undefined ||
      word == "" //||
      // fromLang === undefined ||
      // fromLang == "" ||
      // toLang === undefined ||
      // toLang == ""
    ) {
      return;
    }

    const definitionAPI =
      import.meta.env.VITE_DEFINITION_URL +
      word + 
      "?key=" +
      import.meta.env.VITE_DEFINITION_APP_KEY;

    let pronunciationAPI = "https://media.merriam-webster.com/audio/prons/" + fromLang +
    `${fromLang === "en" ? "/us/" : "/me/"}` + "mp3/" + word[0] + "/";
    

    const definitionResponse = axios({
      url: definitionAPI,
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
      },
    })
      .then(async (res) => {
        res.data[0].pronunciationAudio = pronunciationAPI + res.data[0].hwi.prs[0].sound.audio + ".mp3"
        return res.data;
        console.log(res)
        console.log(
          "pos",
          res.data[0].fl
        );
        console.log(
          "shortDefinition",
          res.data[0].shortdef
        );
        //  console.log(
        //   "longDefinition",
        //   res.data[0].def[0].sseq[0].sense[0].dt
        // );
        console.log(
          "pronunciation",
          pronunciationAPI + res.data[0].hwi.prs[0].sound.audio + ".mp3"
        );
      })
      .catch((err) => {
        console.log("ERROR WITH DEFINITION:", err);
        return "DEFINITION not available for this word.";
      });

    return definitionResponse;
    //     // to hold definition
    //     var def = '';
    //     //resets POS value for each call
    //     partOfSpeech = '';

    //     // settings for API call
    //     const options = {
    //       method: 'GET',
    //       url: 'https://lexicala1.p.rapidapi.com/search-entries?source=global&language='+wordLang+'&text='+word+'&morph=true',
    //       headers: {
    //         'X-RapidAPI-Key': APIKeys.DefKey,
    //         'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
    //       }
    //     };

    //     // Makes api call and parses out the definition returns if there was an error
    //     try {
    //         const response = await axios.request(options);
    //         // counts to make sure we only grab first definiton and POS
    //         var count = 0;
    //         var countPOS = 0

    //         //api call response is a jsosn object you must iterate through to access Sense property which contains an array of definitions
    //         response.data.results.forEach(results => {

    //           // inside senses array of results JSON
    //           results.senses.forEach(senses => {
    //             /*Because of ForEach needed to iterate through JSON response object array, multiple deifnitions may be pulled if there are multiple
    //             Only need the first one, which is the most common usage of the word*/
    //             if (count == 0) {
    //               def = senses.definition;;
    //               count++
    //             }
    //           })

    //           //grabbing word's part of speech
    //             if (countPOS == 0) {
    //               partOfSpeech = results.headword.pos;
    //               countPOS++
    //             }

    //         });
    //       } catch (error) {
    //         console.error("Error grabbing DEF: " + error);
    //         //If Error is 429 we hit the API limit
    //         if (error.response.status == 429) {
    //           def = "HIT LEXICALA'S API CALL LIMIT"
    //           partOfSpeech = "HIT LEXICALA'S API CALL LIMIT";
    //         }
    //         else {
    //           def = 'ERROR: ' + error.response.status;
    //           partOfSpeech = 'ERROR: ' + error.response.status;
    //         }
    //       }

    //     return def
  },

  //   // returns part of speech found and assigned from within getDefinition function
  //   getPartOfSpeech() : string {
  //     return partOfSpeech
  //   }
};

export default DictionaryService;
