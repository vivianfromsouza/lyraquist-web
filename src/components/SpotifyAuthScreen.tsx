import { useEffect } from "react";
import { redirectToSpotifyAuthorize } from "../utils/spotifyAuth";

const SpotifyAuthScreen: React.FC = () => {

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Connect to Spotify
          </h1>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center">
            <button
              onClick={redirectToSpotifyAuthorize}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
            >
              Login with Spotify
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpotifyAuthScreen;
