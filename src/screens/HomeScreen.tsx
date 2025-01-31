/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getSpotifyAccessCode,
  getSpotifyAuthCode,
} from "../services/spotifyAuth";
import { useNavigate } from "react-router-dom";
import StarredLang from "../components/StarredLang";
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import UserReaderWriter from "../services/UserReaderWriter";
import LocalFirebaseClient from "../services/firebase/LocalFirebaseClient";
import { useFirebase } from "../services/firebase/FirebaseContext";
import LanguageReaderWriter from "../services/LanguageReaderWriter";
import { Pressable, ScrollView, View, PixelRatio, Text } from "react-native-web";
import SongCard from "../components/Song";
import HistoryReaderWriter from "../services/HistoryReaderWriter";
import { PlayItem } from "../models/Types";

var counter = 0;
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const HomeScreen: React.FC = () => {
  const [authCode, setAuthCode] = useState<string | null>("");
  const [accessCode, setAccessCode] = useState<string | null>("");
  const [username, setUsername] = useState<string>("");
  const [loading, isLoading] = useState(true);
  const [starredLanguages, setStarredLanguages] = useState<any[] | null>([]);
  const [history, setHistory] = useState<any[] | null>([]);
  const { currentUser } = useFirebase();

  const navigate = useNavigate();
  const auth = getAuth(LocalFirebaseClient);
  const user = auth.currentUser?.uid;
  const codeVerifier = localStorage.getItem("code_verifier");
  console.log("MYUSER:" + currentUser);

  async function getAuthCode() {
    const authCode = await getSpotifyAuthCode();
    setAuthCode(authCode);
  }

  async function getAccessCode() {
    const accessCode = await getSpotifyAccessCode();
    setAccessCode(accessCode);
  }

  function getUsername() {
    UserReaderWriter.getUserName().then((name) => setUsername(name));
  }

  function getLanguages() {
    isLoading(true);
    LanguageReaderWriter.getLanguages().then((languages) =>
      setStarredLanguages(languages)
    );
    counter += 1;
  }

  async function getHistory() {
    isLoading(true);
    await HistoryReaderWriter.getUserHistory().then((history : any) => {
      const historySongs: PlayItem[] = history.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: "spotify:track:" + song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        album: song.songs["album"],
        duration: song.songs["duration"],
        songID: song.songs["song_id"] ? song.songs["song_id"] : "null",
      }));
      setHistory(historySongs);
    });

    counter += 1;
  }

  useEffect(() => {
    getAuthCode();
    getAccessCode();
    getUsername();
    getLanguages();
    getHistory();
  }, [authCode, codeVerifier, username]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.introSect}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 20,
              marginTop: 15,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 40,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#e8e1db",
                  }}
                  accessibilityLabel="welcome"
                >
                  Hello
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingTop: 40,
                    fontSize: getFontSize(30),
                    fontWeight: "bold",
                    color: "#edc526",
                  }}
                  accessibilityLabel="username"
                >
                  {username}
                </Text>
                <Text
                  style={{
                    marginLeft: 1,
                    paddingTop: 40,
                    fontSize: getFontSize(30),
                    fontWeight: "bold",
                    color: "#e8e1db",
                  }}
                >
                  !
                </Text>
              </View>
              <Text
                style={{
                  paddingLeft: 20,
                  fontSize: getFontSize(18),
                  color: "#e8e1db",
                }}
              >
                Let's start learning!
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Pressable
              // TODO: IMPLEMENT SEARCH HEREs
                // onPress={() => navigation.navigate("Search", {})}
                accessibilityLabel="search"
              >
                {/* <FontAwesome
                  name="search"
                  size={35}
                  color="#e8e1db"
                  style={{ marginBottom: 15 }}
                /> */}
                <SearchOutlined />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.starredLanguagesSect}>
          <Text
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: getFontSize(25),
              fontWeight: "bold",
              color: "#303248",
            }}
          >
            Starred Languages
          </Text>
          <Text style={styles.noteText}>
            Star languages on their specific language pages for quick access
            here!
          </Text>

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 10,
              backgroundColor: "#e8e1db",
              shadowColor: "#171717",
              elevation: 8,
            }}
          >
            <View style={{ marginLeft: 10, marginBottom: 12, marginRight: 10 }}>
              {starredLanguages!.map((value, index) => (
                <StarredLang value={value} key={index} />
              ))}
              <Pressable
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  marginLeft: 4,
                  alignItems: "center",
                }}
                // TODO: IMPLEMENT SEARCH HERE
                // onPress={() => navigation.navigate("SearchLanguage", {})}
              >
                <Text
                  style={{
                    fontSize: getFontSize(20),
                    fontFamily: "Karla",
                    marginRight: 10,
                    color: "#2D3047",
                  }}
                >
                  Explore more Languages!
                </Text>
                {/* <AntDesign name="arrowright" size={22} color="#FF4A1C" /> */}
                <ArrowRightOutlined />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.historySect}>
            <Text style={styles.header}>Tune Back In</Text>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
            {/*TODO: THE SHOWHORIZONTALSCROLLINDICATOR doesnt work anymore */}
            {console.log(history)}
            <ScrollView horizontal>
              {history!.length != 0 &&
                history!.map((item: any, index: any) => (
                  <SongCard
                    item={item}
                    key={index}
                  />
                ))}
            </ScrollView>
            {history!.length == 0 && (
              <View style={{}}>
                <Text
                  style={{
                    fontSize: getFontSize(17),
                    textAlign: "center",
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "gray",
                  }}
                >
                  No History Yet... Start Listening Now!
                </Text>
              </View>
            )}
          </View>

      </ScrollView>
      {/* <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
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
      </section> */}

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

const styles = 
{
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  introSect: {
    flex: 1,
    width: 1000,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: 15,
    paddingBottom: 30,
  },
  shadow: {
    shadowColor: "#171717",
    elevation: 20,
    position: "relative",
  },
  starredLanguagesSect: {
    flex: 1,
  },
  historySect: {
    flex: 1,
  },
  savedSect: {
    flex: 1,
  },
  workbookSect: {
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold" as "bold",
    color: "#303248",
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
  noteText: {
    paddingLeft: 20,
    paddingRight: 10,
    fontSize: getFontSize(15),
    color: "#303248",
    textAlign: "left" as "left", // Ensure textAlign is one of the allowed values
    marginBottom: 10,
  },
}
export default HomeScreen;
