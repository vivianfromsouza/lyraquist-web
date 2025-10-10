import axios from "axios";
import { franc } from 'franc';
import { iso6393 } from 'iso-639-3';

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
  async detectLanguage(word) : Promise<string> {
     if (!word || word.trim().length === 0) {
        return "";
    }

    const threeCharCode = franc(word);

    if (threeCharCode === 'und') {
        return "un";
    }

    const languageData = iso6393.find(
        (lang) => lang.iso6393 === threeCharCode
    );

    return languageData?.iso6391 || "un";
  }
};

export default TranslationService;
