/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Worked on by: Vivian D'Souza, Ashley Bickham
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import { ArrowBackOutline } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";

function AddSongToPlaylistScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const songItem = location.state;
  const songURL = songItem.song_id.split(":")[2];

  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  function getMyPlaylists() {
    setTimeout(async () => {
      PlaylistReaderWriter.getMyPlaylists().then((myPlaylists) => {
        let list: any[] = [];
        for (const i in myPlaylists) {
          list.push(myPlaylists[i]);
        }

        list.push({
          name: "Create New Playlist",
          playlist_id: "0",
        });

        setPlaylistItems(list);
      });
    }, 1000);
  }

  async function addSong() {
    const songUID = await SongReaderWriter.getSongIDByURL(songURL);
    await RecordReaderWriter.addSongToRecords(songUID.song_id, selectedPlaylistId);
  }

  useEffect(() => {
    getMyPlaylists();
  }, [selectedPlaylist, selectedPlaylistId]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#5bc8a6",
          paddingTop: 45,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          paddingBottom: 15,
          paddingLeft: 20,
        }}
      >
        <Pressable onPress={() => navigate(-1)} style={{}}>
          {/* <Ionicons style={{}} name="arrow-back" size={35} color="white" /> */}
          <ArrowBackOutline />
        </Pressable>
        <Text style={styles.title}>Add song to playlist</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20, paddingTop: 10 }}>
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
        <Dropdown
          value={selectedPlaylist}
          onChange={(e) =>  {setSelectedPlaylist(e.value); setSelectedPlaylistId(e.value.playlist_id); console.log(e.value); console.log(e.value.playlist_id);}}
          options={playlistItems}
          optionLabel="name"
          placeholder="Select a playlist"
          className="w-full md:w-14rem"
        />
      </View>

      <Pressable
        onPress={addSong}
        style={styles.button}
        accessibilityLabel="addconfirm"
        accessible={true}
      >
        <Text style={styles.buttonText}>Add Song</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
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
    marginTop: 20,
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
