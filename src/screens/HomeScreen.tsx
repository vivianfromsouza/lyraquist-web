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
import homeStyles from "../styles/HomeStyles";

let counter = 0;

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

  function getUsername() {
    UserReaderWriter.getUserName().then((name) => setUsername(name));
  }

  function getLanguages() {
    LanguageReaderWriter.getLanguages().then((languages) =>
      setStarredLanguages(languages)
    );
    counter += 1;
  }

  async function getHistory() {
    await HistoryReaderWriter.getUserHistory().then((history: any) => {
      const historySongs: PlayItem[] = history.map((song) => ({
        artist: song.track.artists[0]["name"],
        spotifyURL: song.track.uri,
        imageURL: song.track.album.images[0]["url"],
        name: song.track.name,
        duration: song.track.duration_ms,
      }));
      setHistory(historySongs);
    });

    counter += 1;
  }

  function getPlaylists() {
    PlaylistReaderWriter.getMyPlaylists().then((playlists) => {
      setSavedPlaylists(playlists);
    });
    counter += 1;
  }

  async function getSongs() {
    await RecordReaderWriter.getMySongs().then((songs) => {
      const savedSongs: PlayItem[] = songs.map((song) => ({
        artist: song.songs["artist"],
        spotifyURL: "spotify:track:" + song.songs["spotify_url"],
        imageURL: song.songs["image_url"],
        name: song.songs["name"],
        duration: song.songs["duration"],
        isLiked: song["is_liked"],
        recordID: song["record_id"],
      }));
      setSavedSongs(savedSongs);
    });
    counter += 1;
  }

  function getWorkbooks() {
    WorkbookReaderWriter.getWorkbooks().then((workbooks) =>
      setWorkbooksList(workbooks)
    );
  }

  // window.addEventListener("storage", () => {
  //   // When local storage changes, dump the list to
  //   // the console.
  //   const value = window.localStorage.getItem("isLoggedIn");
  //   console.log(value ? JSON.parse(value) : null);
  // });

  useEffect(() => {
    if (currentUser) {
      console.log("COD VERIFIER:");
      console.log(localStorage.getItem("code_verifier"));
      setLoadingScreen(true);
      try {
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
          console.log(payload);
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
      } catch (err) {
        console.log(err);
      }
    }
  }, [username]);

  if (loadingScreen) {
    return (
      <>
        <ScrollView style={homeStyles.container}>
          <View style={homeStyles.introSect}>
            <View style={homeStyles.settingsLocation}>
              <Pressable
                onPress={() => {
                  navigate("/settings", { state: "isLoggedIn" });
                }}
                accessibilityLabel="settings"
              >
                <SettingOutlined style={homeStyles.settingIcon} size={100} />
              </Pressable>
            </View>
            <View style={homeStyles.searchLocation}>
              <View>
                <View style={homeStyles.titleLocation}>
                  <Text
                    style={homeStyles.titleText}
                    accessibilityLabel="welcome"
                  >
                    Hello,
                  </Text>
                  <Text
                    style={homeStyles.nameText}
                    accessibilityLabel="username"
                  >
                    {username}!
                  </Text>
                </View>
                <Text style={homeStyles.subTitleText}>
                  Let's start learning!
                </Text>
              </View>
              <View style={homeStyles.iconDivider}>
                <Pressable
                  onPress={() => navigate("/Search", {})}
                  accessibilityLabel="search"
                >
                  <SearchOutlined style={homeStyles.searchIcon} size={100} />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={homeStyles.starredLanguagesSect}>
            <Text style={homeStyles.starredLangText}>Starred Languages</Text>
            <Text style={homeStyles.noteText}>
              Star languages on their specific language pages for quick access
              here!
            </Text>

            <View style={homeStyles.langList}>
              <View>
                {starredLanguages!.map((value, index) => (
                  <StarredLang value={value["name"]} key={index} />
                ))}
                <Pressable
                  style={homeStyles.moreLangBtn}
                  onPress={() => navigate("/searchLanguages", {})}
                >
                  <Text style={homeStyles.moreLangTxt}>
                    Explore more Languages!
                  </Text>
                  <ArrowRightOutlined />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={homeStyles.historySect}>
            <Text style={homeStyles.sectionTitle}>Tune Back In</Text>
            <ScrollView horizontal style={homeStyles.hzScroll}>
              {history!.length != 0 &&
                history!.map((item: any, index: any) => (
                  <SongCard item={item} key={index} />
                ))}
            </ScrollView>
            {history!.length == 0 && (
              <View>
                <Text style={homeStyles.noResultsText}>
                  No History Yet... Start Listening Now!
                </Text>
              </View>
            )}
          </View>

          <View style={homeStyles.savedSect}>
            <View style={homeStyles.addToBtn}>
              <Text style={homeStyles.sectionTitle}>My Playlists</Text>
              <Pressable
                onPress={() => navigate("/playlist/create", {})}
                style={homeStyles.addBtn}
              >
                <PlusCircleOutlined style={homeStyles.addIcon} />
                <Text style={homeStyles.addTxt}>Add New Playlist</Text>
              </Pressable>
            </View>
            <Text style={homeStyles.noteText}>
              Save songs in playlists for quick access here!
            </Text>
            <ScrollView horizontal style={homeStyles.hzScroll}>
              {savedPlaylists!.length != 0 &&
                savedPlaylists!.map((item, index) => (
                  <PlaylistCard item={item} key={index} />
                ))}
            </ScrollView>
            {savedPlaylists!.length == 0 && (
              <View>
                <Text style={homeStyles.noResultsText}>
                  No Playlists Yet...
                </Text>
              </View>
            )}
          </View>

          <View style={homeStyles.savedSect}>
            <Text style={homeStyles.sectionTitle}>Saved Songs</Text>
            <ScrollView horizontal style={homeStyles.hzScroll}>
              {savedSongs!.length != 0 &&
                savedSongs!.map((item, index) => (
                  <SongCard item={item} key={index} />
                ))}
            </ScrollView>
            {savedSongs!.length == 0 && (
              <View style={{}}>
                <Text style={homeStyles.noResultsText}>
                  No Saved Songs Yet...
                </Text>
              </View>
            )}
          </View>

          <View style={homeStyles.workbookSect}>
            <View style={homeStyles.addToBtn}>
              <Text style={homeStyles.sectionTitle}>Workbooks</Text>
              <Pressable
                onPress={() => navigate("/workbook/NewWorkbook", {})}
                style={homeStyles.addBtn}
              >
                <PlusCircleOutlined style={homeStyles.addIcon} />
                <Text style={homeStyles.addTxt}>Add New Workbook</Text>
              </Pressable>
            </View>
            <Text style={homeStyles.noteText}>
              Save words in workbooks for quick access here!
            </Text>
            <ScrollView horizontal style={homeStyles.hzScroll}>
              {workbooksList!.length != 0 &&
                workbooksList!.map((item, index) => (
                  <Workbook item={item} key={index} />
                ))}
            </ScrollView>
            {workbooksList!.length == 0 && (
              <View style={{}}>
                <Text style={homeStyles.noResultsText}>
                  No Current Workbooks
                </Text>
              </View>
            )}
          </View>
          <Text>{"\n\n\n\n"}</Text>
        </ScrollView>
      </>
    );
  } else {
    return (
      <View style={homeStyles.loading}>
        <ActivityIndicator size="large" color="#303248" />
      </View>
    );
  }
};

export default HomeScreen;