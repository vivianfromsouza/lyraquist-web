import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getSpotifyAccessCode, getSpotifyAuthCode } from "../utils/spotifyAuth";
import { useNavigate } from "react-router-dom";
import UserReaderWriter from "../services/UserReaderWriter";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useFirebase } from "../services/firebase/FirebaseContext";

const HomeScreen: React.FC = () => {
  const [authCode, setAuthCode] = useState<string | null>("");
  const [accessCode, setAccessCode] = useState<string | null>("");
  const [username, setUsername] = useState<string>("");
  const { currentUser } = useFirebase();

  const navigate = useNavigate();
  const auth = getAuth(LocalFirebaseClient);
  const user = auth.currentUser?.uid;
  const codeVerifier = localStorage.getItem("code_verifier");
  console.log("MYUSER:" + currentUser);

  async function getAuthCode() {
    const authCode = await getSpotifyAuthCode();
    setAuthCode(authCode);
    // console.log(authCode);
  }

  async function getAccessCode() {
    const accessCode = await getSpotifyAccessCode();
    setAccessCode(accessCode);
    // console.log(authCode);
  }

  async function getUsername() {
    UserReaderWriter.getUserName(currentUser).then((name) => setUsername(name));
  }

  useEffect(() => {
    getAuthCode();
    getAccessCode();
    getUsername();
    console.log(authCode);
    console.log(codeVerifier);
    console.log(user);
  }, [authCode, codeVerifier, username, user]);

  return (
    <>
      <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Welcome, {username}!
          </h1>
        </div>
      </section>

      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Starred Languages
          </h2>
        </div>
      </section>

      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Tune back in
          </h2>
        </div>
      </section>

      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            My Playlists
          </h2>
        </div>
      </section>

      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Saved Songs
          </h2>
        </div>
      </section>

      <button
        onClick={() => {
          navigate("/playback");
        }}
        className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
      >
        Go To Playback
      </button>

      <button
        onClick={() => {
          navigate("/about");
        }}
        className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
      >
        About
      </button>
    </>
  );
};

export default HomeScreen;
