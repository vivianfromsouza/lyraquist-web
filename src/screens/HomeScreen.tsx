/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarredLang from "../components/StarredLang";
import {
  SearchOutlined,
  ArrowRightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import UserReaderWriter from "../services/UserReaderWriter";
import { useFirebase } from "../services/firebase/FirebaseContext";
import LanguageReaderWriter from "../services/LanguageReaderWriter";
import {
  Pressable,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native-web";
import SongCard from "../components/Song";
import HistoryReaderWriter from "../services/HistoryReaderWriter";
import { PlayItem } from "../models/Types";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import PlaylistCard from "../components/Playlist";
import RecordReaderWriter from "../services/RecordReaderWriter";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import { PlusCircleOutlined } from "@ant-design/icons";
import Workbook from "../components/Workbook";
import LocalSupabaseClient from "../services/LocalSupabaseClient";

let counter = 0;
// TODO: FIx font sizing here
// const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size;

const HomeScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  // const [loading, isLoading] = useState(true);
  const [starredLanguages, setStarredLanguages] = useState<any[] | null>([]);
  const [history, setHistory] = useState<any[] | null>([]);
  const [savedPlaylists, setSavedPlaylists] = useState<any[] | null>([]);
  const [savedSongs, setSavedSongs] = useState<any[] | null>([]);
  const [workbooksList, setWorkbooksList] = useState<any[] | null>([]);
  const [loadingScreen, setLoadingScreen] = useState(false); // only one that you set it to false initially

  const { currentUser } = useFirebase();

  const navigate = useNavigate();
  // const auth = getAuth(LocalFirebaseClient);

  function getUsername() {
    // setLoadingScreen(true);

    UserReaderWriter.getUserName().then((name) => setUsername(name));
  }

  function getLanguages() {
    // setLoadingScreen(true);
    // isLoading(true);
    LanguageReaderWriter.getLanguages().then((languages) =>
      setStarredLanguages(languages)
    );
    counter += 1;
  }

  async function getHistory() {
    // setLoadingScreen(true);
    // isLoading(true);
    await HistoryReaderWriter.getUserHistory().then((history: any) => {
      const historySongs: PlayItem[] = history.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: "spotify:track:" + song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        album: song.songs["album"],
        duration: song.songs["duration"],
      }));
      setHistory(historySongs);
      // setLoadingScreen(false);
    });

    counter += 1;
  }

  function getPlaylists() {
    // isLoading(true);
    // setLoadingScreen(true);
    PlaylistReaderWriter.getMyPlaylists().then((playlists) => {
      setSavedPlaylists(playlists);
    });
    counter += 1;
    // isLoading(false);
    // setLoadingScreen(false);
  }

  async function getSongs() {
    // setLoadingScreen(true);
    // isLoading(true);

    await RecordReaderWriter.getMySongs().then((songs) => {
      console.log("API songs response:", songs); // <--- Add this

      const savedSongs: PlayItem[] = songs.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: "spotify:track:" + song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        // album: song.songs["album"],
        duration: song.songs["duration"],
        isLiked: song["is_liked"],
        recordID: song["record_id"],
      }));
      setSavedSongs(savedSongs);
    });
    counter += 1;
    // isLoading(false);
    // setLoadingScreen(false);
  }

  function getWorkbooks() {
    // isLoading(true);
    // setLoadingScreen(true);
    WorkbookReaderWriter.getWorkbooks().then((workbooks) =>
      setWorkbooksList(workbooks)
    );
    // isLoading(false);
    // setLoadingScreen(false);
  }

  window.addEventListener("storage", () => {
    // When local storage changes, dump the list to
    // the console.
    const value = window.localStorage.getItem("isLoggedIn");
    console.log("LOGIN CHANGED");
    console.log(value ? JSON.parse(value) : null);
  });

  // useEffect(() => {
  //   console.log("once");
  //   getSpotifyAuthCode();
  //   getSpotifyAccessCode();
  // }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("COD VERIFIER:");
      console.log(localStorage.getItem("code_verifier"));
      // getAuthCode();
      // getAccessCode();
      setLoadingScreen(true);
      try {
        // setLoadingScreen(true);

        const handleUserInserts = (payload) => {
          getUsername();
          console.log(payload);
        };

        getUsername();

        LocalSupabaseClient.channel("users")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "users" },
            handleUserInserts
          )
          .subscribe();

        const handleHistoryInserts = (payload) => {
          console.log(payload);
          getHistory();
        };

        getHistory();

        LocalSupabaseClient.channel("history")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "history" },
            handleHistoryInserts
          )
          .subscribe((status) => console.log("H:" + status));

        const handleLanguageInserts = (payload) => {
          console.log(payload);
          getLanguages();
        };

        getLanguages();

        LocalSupabaseClient.channel("languages")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "languages" },
            handleLanguageInserts
          )
          .subscribe((status) => console.log("L:" + status));

        // const handleWorkbookInserts = (payload) => {
        //   getWorkbooks();
        // };

        getWorkbooks();

        // LocalSupabaseClient.channel("workbooks")
        //   .on(
        //     "postgres_changes",
        //     { event: "*", schema: "public", table: "workbooks" },
        //     handleWorkbookInserts
        //   )
        //   .subscribe();

        // const handlePlaylistInserts = (payload) => {
        //   getPlaylists();
        // };

        getPlaylists();

        // LocalSupabaseClient.channel("playlists")
        //   .on(
        //     "postgres_changes",
        //     { event: "INSERT", schema: "public", table: "playlists" },
        //     handlePlaylistInserts
        //   )
        //   .subscribe((status) => console.log("P:" + status));

        // whenever a song is added or deleted, the home screen will update with new set of songs
        const handleRecordInserts = (payload) => {
          console.log(payload)
          getSongs();
        };

        getSongs();

        LocalSupabaseClient.channel("records")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "records" },
            handleRecordInserts
          )
          .subscribe((status) => console.log(status));

        // UserReaderWriter.getCurrentTrackDetails().then((track) => {
        //   console.log("CURR TRACK:");
        //   console.log(track);
        // });
        // setLoadingScreen(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [username]);

  if (loadingScreen) {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.introSect}>
            <View
              style={{
                marginRight: 20,
                marginTop: 20,
                marginBottom: -20,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Pressable
                onPress={() => {
                  navigate("/settings", { state: "isLoggedIn" });
                }}
                accessibilityLabel="settings"
              >
                <SettingOutlined
                  style={{ color: "#e8e1db", fontSize: 30 }}
                  size={100}
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
                marginTop: 0,
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
                  onPress={() => navigate("/Search", {})}
                  accessibilityLabel="search"
                >
                  {/* <FontAwesome
                  name="search"
                  size={35}
                  color="#e8e1db"
                  style={{ marginBottom: 15 }}
                /> */}
                  <SearchOutlined
                    style={{ color: "#e8e1db", fontSize: 35, marginBottom: 10 }}
                    size={100}
                  />
                </Pressable>
              </View>
            </View>
            <View></View>
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
              <View
                style={{ marginLeft: 10, marginBottom: 12, marginRight: 10 }}
              >
                {starredLanguages!.map((value, index) => (
                  <StarredLang value={value["name"]} key={index} />
                ))}
                <Pressable
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    marginLeft: 4,
                    alignItems: "center",
                  }}
                  onPress={() => navigate("/searchLanguages", {})}
                >
                  <Text
                    style={{
                      fontSize: getFontSize(15),
                      //fontFamily: "Karla",
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
            <ScrollView horizontal style={{ marginRight: 20, marginLeft: 20 }}>
              {history!.length != 0 &&
                history!.map((item: any, index: any) => (
                  <SongCard item={item} key={index} />
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

          <View style={styles.savedSect}>
            <Text style={styles.header}>My Playlists</Text>
            <ScrollView horizontal style={{ marginRight: 20, marginLeft: 20 }}>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
              {/*TODO: THE SHOWHORIZONTALSCROLLINDICATOR doesnt work anymore */}
              {savedPlaylists!.length != 0 &&
                savedPlaylists!.map((item, index) => (
                  <PlaylistCard item={item} key={index} />
                ))}
            </ScrollView>
            {savedPlaylists!.length == 0 && (
              <View>
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
                  No Playlists Yet...
                </Text>
              </View>
            )}
          </View>

          <View style={styles.savedSect}>
            <Text style={styles.header}>Saved Songs</Text>
            <ScrollView horizontal style={{ marginRight: 20, marginLeft: 20 }}>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
              {/*TODO: THE SHOWHORIZONTALSCROLLINDICATOR doesnt work anymore */}
              {savedSongs!.length != 0 &&
                savedSongs!.map((item, index) => (
                  <SongCard item={item} key={index} />
                ))}
            </ScrollView>
            {savedSongs!.length == 0 && (
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
                  No Saved Songs Yet...
                </Text>
              </View>
            )}
          </View>

          <View style={styles.workbookSect}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <Text
                style={{
                  paddingLeft: 20,
                  paddingTop: 20,
                  fontSize: getFontSize(25),
                  fontWeight: "bold",
                  color: "#303248",
                  marginBottom: 10,
                }}
              >
                Workbooks
              </Text>
              <Pressable
                onPress={() => navigate("/workbook/NewWorkbook", {})}
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  alignItems: "center",
                  paddingTop: 15,
                }}
              >
                {/* <AntDesign
                name="pluscircleo"
                size={19}
                color="#303248"
                style={{ marginRight: 5 }}
              /> */}
                <PlusCircleOutlined
                  style={{ marginRight: 5, color: "#303248" }}
                />
                <Text
                  style={{
                    fontSize: getFontSize(15),
                    color: "#303248",
                    fontWeight: "bold",
                  }}
                >
                  Add New Workbook
                </Text>
              </Pressable>
            </View>
            <Text style={styles.noteText}>
              Save words in workbooks for quick access here!
            </Text>
            <ScrollView horizontal style={{ marginRight: 20, marginLeft: 20 }}>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
              {/*TODO: THE SHOWHORIZONTALSCROLLINDICATOR doesnt work anymore */}
              {workbooksList!.length != 0 &&
                workbooksList!.map((item, index) => (
                  <Workbook item={item} key={index} />
                ))}
            </ScrollView>
            {workbooksList!.length == 0 && (
              <View style={{}}>
                <Text
                  style={{
                    fontSize: getFontSize(17),
                    textAlign: "center",
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "gray",
                    paddingTop: 10,
                  }}
                >
                  No Current Workbooks
                </Text>
              </View>
            )}
          </View>

          {/*<Text>{"\n\n\n\n"}</Text>*/}
        </ScrollView>

        {/*<button
          onClick={() => {
            navigate("/settings", { state: "isLoggedIn" });
          }}
          className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
        >
          Settings
        </button>*/}
      </>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#303248" />
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    //height:'100vh'
  },
  introSect: {
    flex: 1,
    //width: 1000,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    //borderRadius: 15,
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
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
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
};
export default HomeScreen;
