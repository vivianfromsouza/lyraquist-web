// api/dictionary.js

// Using node-fetch for making server-side HTTP requests
import fetch from "node-fetch";

// Vercel Serverless Function handler
export default async function dictionaryLookup(req, res) {
  // 1. Get the word from the client request (e.g., /api/dictionary?word=test)
  const { word } = req.query;
  const { fromLang } = req.query;

  if (!word) {
    return res.status(400).json({ error: 'Word parameter is required.' });
  }

  // 2. Load API keys from Vercel's environment variables (secure)
  const app_id = "d23ee800";
  const app_key = "46621eea6f88172a3a972b4b6f620946";
  const url =
    "https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/" + fromLang + "/" + word.toLowerCase();
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // 3. Make the request to the external Oxford Dictionary API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        app_id: app_id,
        app_key: app_key,
      },
    });

    const data = await response.json();

    // 4. Send the external API's response (or status code) back to your React client
    // This response is now from your Vercel domain, so no CORS error occurs.
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to proxy request." });
  }
}
