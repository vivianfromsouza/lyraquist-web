import axios from "axios";
import TranslationService from "./TranslationService";

const DictionaryService = {
  async getDefinition(word, fromLang): Promise<any> {
    return axios(
      "http://localhost:3000/api/dictionaryLookup?word=" +
        word +
        "&fromLang=" +
        fromLang
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Frontend failed to fetch from local API:", error);
        return "Definition unavailable.";
      });

    // fetch(
    //   "http://localhost:3000/api/dictionaryLookup?word=" +
    //     word +
    //     "&fromLang=" +
    //     fromLang
    // )
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`API Proxy Error: ${res.status} ${res.statusText}`);
    //     }
    //     return res.text();
    //   })
    //   .then((text) => {
    //     console.log("Raw response:", text);
    //     try {
    //       const data = JSON.parse(text);
    //       console.log("Parsed JSON:", data);
    //       return data;
    //     } catch (err) {
    //       console.error("JSON parse error:", err);
    //       return "Definition unavailable.";
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Frontend failed to fetch from local API:", error);
    //     return "Definition unavailable.";
    //   });
  },
};

export default DictionaryService;
