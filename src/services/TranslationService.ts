import axios from "axios";
import LanguageDetect from "languagedetect";

const API_BASE = import.meta.env.VITE_LOCAL_BASE ?? ""; 

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

  async getSingleTranslation(word, fromLang, toLang): Promise<any> {
    console.log("API", API_BASE);
    return axios(
     `${API_BASE}/api/singleTranslation?fromLang=` +
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
  async detectLanguage(word): Promise<string> {
    if (!word || word.trim().length === 0) {
      return "";
    }

    const langDetector = new LanguageDetect();
    langDetector.setLanguageType("iso2");

    const detectedLang = langDetector.detect(word, 1);

    console.log("detected lang;", detectedLang)

    return detectedLang[0][0].toString();
  },
};

export default TranslationService;
