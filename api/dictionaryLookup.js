import fetch from "node-fetch";

export default async function dictionaryLookup(req, res) {
  const { word } = req.query;
  const { fromLang } = req.query;

  if (!word) {
    return res.status(400).json({ error: "Word parameter is required." });
  }

  const app_id = process.env.VITE_OXFORD_APP_ID;
  const app_key = process.env.VITE_OXFORD_APP_KEY;

  const url =
    "https://od-api-sandbox.oxforddictionaries.com/api/v2/words/" +
    fromLang +
    "?q=" +
    word.toLowerCase() +
    "&fields=definitions,pronunciations";
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
