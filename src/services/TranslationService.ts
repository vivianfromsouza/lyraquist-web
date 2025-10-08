import axios from "axios";

const TranslationService = {
  async getTranslationAllLyrics(lyrics, toLanguage): Promise<string> {
    if (lyrics == undefined || "") {
      return "";
    }

    const lyricsToSend = [{ Text: lyrics }];
    let translatedLyrics;
    const lyricsAPI =
      "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=" +
      toLanguage;

    const translationResponse: Promise<string> = axios({
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
      .then(async (res) => {
        translatedLyrics = res.data[0].translations[0].text;
        return translatedLyrics;
      })
      .catch((err) => {
        console.log("ERROR WITH TRANSLATION:", err);
        return "Translation not available for this track.";
      });

    return translationResponse;
  },

  async getSingleTranslation(word, fromLang, toLang): Promise<string> {
    return axios(
      "http://localhost:3000/api/singleTranslation?fromLang=" +
        fromLang +
        "&toLang=" +
        toLang +
        "&word=" +
        word
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Frontend failed to fetch from local API:", error);
        return "Translation unavailable.";
      });
  },
};

export default TranslationService;
