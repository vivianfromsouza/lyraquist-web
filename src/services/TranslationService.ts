import axios from "axios";

const TranslationService = {
  async getTranslationAllLyrics(lyrics, toLanguage): Promise<any> {
    if (lyrics == undefined || "") {
      return "";
    }

    const lyricsToSend = [{ Text: lyrics }];
    const lyricsAPI =
      "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=" +
      toLanguage;

    const translationResponse: Promise<any> = axios({
      url: lyricsAPI,
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
        "Ocp-Apim-Subscription-Key": import.meta.env.VITE_TRANSLATE_KEY,
        "Ocp-Apim-Subscription-Region": import.meta.env.VITE_TRANSLATE_REGION,
      },
      data: lyricsToSend,
    })
      .then(async (response) => {
        return response;
      })
      .catch((err) => {
        console.log("ERROR WITH TRANSLATION:", err);
        return "Translation not available for this track.";
      });

    return translationResponse;
  },

  async lexicalaTranslation(word, fromLang): Promise<any> {
    return axios({
      url:
        "https://lexicala1.p.rapidapi.com/search-entries?text=" +
        word.toLowerCase() +
        "&language=" +
        fromLang +
        "&analyzed=true" +
        "&morph=true",
      headers: {
        "x-rapidapi-host": import.meta.env.LEXICALA_HOST,
        "x-rapidapi-key": import.meta.env.VITE_LEXICALA_KEY,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Frontend failed to fetch from local API:", error);
        return "Translation unavailable.";
      });
  }
};

export default TranslationService;
