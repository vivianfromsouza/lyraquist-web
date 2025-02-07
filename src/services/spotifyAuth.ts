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
import { toast } from "react-toastify";

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
  console.log("AUTHORIZATION:" + localStorage.getItem("code_verifier"));

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code != null) {
    localStorage.setItem("auth_code", code);
    await UserReaderWriter.writeUserAuthCode(code);
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
    data: {},
  })
    .then((response) => {
      console.log("RETRIEVING...");
      console.log(response.data);
      UserReaderWriter.writeUserAccessCode(response.data.access_token);
      UserReaderWriter.writeUserRefreshToken(response.data.refresh_token);
    })
    .catch((err) => {
      console.log("ERROR:" + err);
      return "";
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

export const refresh = async (refreshToken: string) => {
  await axios({
    url: getRefreshURL(refreshToken),
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-type": "application/x-www-form-urlencoded",    },
    data: {},
  })
    // Handle the response from backend here
    .then((res) => {
      UserReaderWriter.writeUserAccessCode(res.data.access_token);
      UserReaderWriter.writeUserRefreshToken(res.data.refresh_token);
      UserReaderWriter.writeUserTimeTokenTaken(new Date().toISOString());
    })

    // Catch errors if any
    .catch((err) => {
      if (err.response.status == 503) {
        toast(
          "There was a server side issue. \nSpotify services may be down or the server cannot handle the request load. Please refrain from pressing buttons repeatedly in quick sucession."
        );
      } else {
        toast("Error! refresh did not work" + err.message);
      }
      console.log(err.status);
    });
};

// builds the refresh URL meant for the Spotify API request to refresh a user's access token
export const getRefreshURL = (refreshToken): string => {
  return (
    "https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=" +
    refreshToken +
    "&client_id=" +
    clientId
  );
};

export const checkRefreshNeeded = async (currTime: Date): Promise<string> => {
  await UserReaderWriter.getUserTimeTokenTaken().then((timeTokenTaken) => {
    const expiry = new Date(timeTokenTaken);
    expiry.setHours(expiry.getHours() + 1);

    // if current time is past expiry, trigger refresh
    if (currTime > expiry) {
      localStorage.setItem("needs_refresh", "true");
    } else {
      localStorage.setItem("needs_refresh", "false");
    }
  });
  return localStorage.getItem("needs_refresh")!;
};

export default base64urlencode;
