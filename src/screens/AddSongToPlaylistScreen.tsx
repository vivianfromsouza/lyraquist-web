/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Worked on by: Vivian D'Souza, Ashley Bickham
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ArrowBackOutline } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import CreateNewPlaylistForm from "../components/CreateNewPlaylistForm";
import { ScrollView } from "react-native-web";

function AddSongToPlaylistScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const songItem = location?.state?.item || "";
  const songURL = songItem["spotifyURL"]?.split(":")[2] || "";
  const [open, setOpen] = useState(false);

  console.log(songItem);

  const [selectedPlaylist, setSelectedPlaylist] = useState<any>("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<any>("");
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  async function addSong() {
    if (!(await SongReaderWriter.isSongInDB(songURL))) {
      await SongReaderWriter.addSongToDBFromSongCard(songItem);
    }
    await RecordReaderWriter.addSongToRecords(songURL, selectedPlaylist);
    navigate(-1);
  }

  async function fetchPlaylists() {
    await PlaylistReaderWriter.getMyPlaylists().then((playlists) => {
      const playlistsToDropdown = [{}];
      playlists.map((playlist) => {
        playlistsToDropdown.push({
          label: playlist.name,
          value: playlist.playlist_id,
        });
      });
      playlistsToDropdown.push({ label: "Create a Playlist", value: "0" });
      setPlaylistItems(playlistsToDropdown);
    });
  }

  useEffect(() => {
    fetchPlaylists();
  }, [selectedPlaylist, selectedPlaylistId]);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: "#5bc8a6",
          paddingTop: 20,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          paddingBottom: 15,
          paddingLeft: 20,
        }}
      >
        <Pressable onPress={() => navigate(-1)} style={{}}>
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </Pressable>
        <Text testID="add-song-title" style={styles.title}>
          Add Song to Playlist
        </Text>
      </View>
      <View
        testID="playlist-dropdown"
        style={{
          marginLeft: 20,
          paddingTop: 30,
          width: "15%",
          justifyContent: "center",
          alignSelf: "center",
          flexDirection: "row",
          zIndex: 10000,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
          {" "}
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 3,
            fontWeight: "bold",
            color: "gray",
          }}
        ></Text>
        <DropDownPicker
          open={open}
          value={selectedPlaylist}
          setValue={setSelectedPlaylist}
          setItems={setPlaylistItems}
          items={playlistItems}
          setOpen={setOpen}
          placeholder="Select a language"
          zIndex={6000}
          zIndexInverse={100000}
        />
      </View>

      {selectedPlaylist === "0" ? (
        <CreateNewPlaylistForm songItem={songItem} />
      ) : (
        <Pressable
          onPress={addSong}
          testID="add-song"
          style={styles.button}
          accessibilityLabel="addconfirm"
          accessible={true}
        >
          <Text style={styles.buttonText}>Add Song</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    flex: 1,
  },
  wordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  button: {
    backgroundColor: "#303248",
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 150,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: "#edc525",
  },
});

export default AddSongToPlaylistScreen;
