// Worked on by: Ashley Bickham
// TODO: USE NEW CONFIG HERE

import axios from "axios";

//var to hold partOfSpeech
var partOfSpeech = '';

//This service handles queries and responses to Lexicala API which will pull word definitions and tentativey words' part of speech (POS)
const DefinitionService = {

  /*grabs word Defintiion and also the POS from same API call
  -did here to minimize API calls as the free version of Lexicala allows only 50 calls per day)*/
  async getDefinition(word, wordLang) : Promise<string> {
    if (word === undefined || word == "" || wordLang === undefined || wordLang == "" ){return ""}
    
    // to hold definition
    var def = '';
    //resets POS value for each call
    partOfSpeech = '';

    // settings for API call
    const options = {
      method: 'GET',
      url: 'https://lexicala1.p.rapidapi.com/search-entries?source=global&language='+wordLang+'&text='+word+'&morph=true',
      headers: {
        'X-RapidAPI-Key': process.env.LEXICALA_API_KEY,
        'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
      }
    };

    // Makes api call and parses out the definition returns if there was an error
    try {
        const response = await axios.request(options);
        // counts to make sure we only grab first definiton and POS
        var count = 0;
        var countPOS = 0 
      
        //api call response is a jsosn object you must iterate through to access Sense property which contains an array of definitions
        response.data.results.forEach(results => {

          // inside senses array of results JSON
          results.senses.forEach(senses => {
            /*Because of ForEach needed to iterate through JSON response object array, multiple deifnitions may be pulled if there are multiple
            Only need the first one, which is the most common usage of the word*/
            if (count == 0) {
              def = senses.definition;;
              count++
            }
          })

          //grabbing word's part of speech
            if (countPOS == 0) {
              partOfSpeech = results.headword.pos;
              countPOS++
            }

        });
      } catch (error) {
        console.error("Error grabbing DEF:", error);

        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;

          if (status === 429) {
            def = "HIT LEXICALA'S API CALL LIMIT";
            partOfSpeech = "HIT LEXICALA'S API CALL LIMIT";
          } else {
            def = `ERROR: ${status}`;
            partOfSpeech = `ERROR: ${status}`;
          }
        } else {
          def = "ERROR: Unknown error";
          partOfSpeech = "ERROR: Unknown error";
        }

        // console.error("Error grabbing DEF: " + error);
        // //If Error is 429 we hit the API limit
        // if (error.response.status == 429) {
        //   def = "HIT LEXICALA'S API CALL LIMIT"
        //   partOfSpeech = "HIT LEXICALA'S API CALL LIMIT";
        // }
        // else {
        //   def = 'ERROR: ' + error.response.status; 
        //   partOfSpeech = 'ERROR: ' + error.response.status;
        // }
      }

    return def
  },

  // returns part of speech found and assigned from within getDefinition function
  getPartOfSpeech() : string {
    return partOfSpeech
  }
}

  
  export default DefinitionService;