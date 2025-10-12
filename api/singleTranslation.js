// api/dictionary.js

// Using node-fetch for making server-side HTTP requests
import fetch from "node-fetch";

// Vercel Serverless Function handler
export default async function singleTranslation(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // 1. Get the word from the client request (e.g., /api/dictionary?word=test)
  const { word } = req.query;
  const { fromLang } = req.query;
  const { toLang } = req.query;

  if (!word || !toLang || !fromLang) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const app_id = "d23ee800";
  const app_key = "46621eea6f88172a3a972b4b6f620946";
  const url =
    "https://od-api-sandbox.oxforddictionaries.com/api/v2/translations/" +
    fromLang +
    "/" +
    toLang +
    "/" +
    word.toLowerCase() + "?fields=translations";

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        app_id: app_id,
        app_key: app_key,
      },
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to proxy request." });
  }
}
