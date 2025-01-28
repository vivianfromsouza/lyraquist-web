import { getAuth } from "firebase/auth";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Welcome, {user?.email}!
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
    </>
  );
};

export default HomeScreen;
