// Worked on by: Vivian D'Souza
import axios from "axios";
import {
  clientId,
  redirectUri,
  authorizationEndpoint,
  scope,
  tokenEndpoint,
} from "../constants/SpotifyConstants";
import UserReaderWriter from "./UserReaderWriter";


// Function to redirect to Spotify authorization page
export const redirectToSpotifyAuthorize = async () => {
  // Generate code verifier and challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  localStorage.setItem("code_verifier", codeVerifier);

  // Construct authorization URL
  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  // Redirect to Spotify authorization page
  window.location.href = authUrl.toString();
};

export const getSpotifyAuthCode = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code != null) {
    localStorage.setItem("auth_code", code);
    await UserReaderWriter.writeUserAuthCode(code );
  }
  return code;
};

export const constructAccessUrl = () => {
  // Generate code verifier and challenge
  const codeVerifier = localStorage.getItem("code_verifier");
  const authCode = localStorage.getItem("auth_code");

  if (authCode != null && codeVerifier != null) {
    const accessUrl = new URL(tokenEndpoint);
    const params = {
      grant_type: "authorization_code",
      code: authCode,
      scope: scope,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    };

    accessUrl.search = new URLSearchParams(params).toString();
    return accessUrl.toString();
  }
  return "";
};

export const getSpotifyAccessCode = async () => {
  axios({
    method: "post",
    url: constructAccessUrl(),
    headers: {
      Accept: "*/*",
      "Content-type": "application/x-www-form-urlencoded",
    },
    data: {}
  })
    .then((response) => {
      console.log("RETRIEVING...");
      console.log(response.data);
      UserReaderWriter.writeUserAccessCode(response.data.access_token);
      UserReaderWriter.writeUserRefreshToken(response.data.refresh_token);

    })
    .catch((err) => {
      console.log("ERROR:" + err)
      return ""
    });

  return "";
};

// Function to generate code verifier
export const generateCodeVerifier = () => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  return Array.from(randomValues)
    .map((value) => possible[value % possible.length])
    .join("");
};

// Function to generate code challenge
export const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);
  return base64urlencode(hashed);
};

// Function to encode array buffer to base64 URL
const base64urlencode = (arrayBuffer: ArrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  let str = "";
  bytes.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export default base64urlencode;