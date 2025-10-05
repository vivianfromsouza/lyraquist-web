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
import { TextInput } from "react-native-web";
import "react-image-picker-editor/dist/index.css";

function AddSongToPlaylistScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const songItem = location.state;
  const songURL = songItem.song_id.split(":")[2];

  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // const config2: ImagePickerConf = {
  //   borderRadius: "8px",
  //   language: "en",
  //   width: "330px",
  //   height: "250px",
  //   objectFit: "contain",
  //   compressInitial: null,
  //   darkMode: false,
  //   rtl: false,
  // };
  // const initialImage: string = '/assets/images/8ptAya.webp';
  // const initialImage = "";

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
    await RecordReaderWriter.addSongToRecords(
      songUID.song_id,
      selectedPlaylistId
    );
  }

  // async function createPlaylist(
    // description = "",
    // imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
  //) {
    // const newPlaylistId = await PlaylistReaderWriter.createPlaylist(
    //   newPlaylistName,
    //   description,
    //   imageURL
    // );
    // await RecordReaderWriter.addSongToRecords(songURL, newPlaylistId);
    //navigate(-1);
  //}

  async function getImageURL(file) {
    if (file) {
      const objectURL = URL.createObjectURL(file); // Create the object URL
      const imageElement = document.getElementById("albumImage") as HTMLInputElement;
      imageElement.src = objectURL; // Set the image source to the object URL
      console.log(objectURL)
      // URL.revokeObjectURL(objectURL);
    }
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
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
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
          onChange={(e) => {
            setSelectedPlaylist(e.value.name);
            setSelectedPlaylistId(e.value.playlist_id);
            console.log(e.value);
            console.log(e.value.playlist_id);
          }}
          options={playlistItems}
          optionLabel="name"
          placeholder="Select a playlist"
          className="w-full md:w-14rem"
        />
      </View>

      {selectedPlaylist === "Create New Playlist" && (
        <>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
            }}
          >
            New Playlist Name:
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              padding: 6,
              paddingLeft: 8,
              borderRadius: 5,
              borderColor: "gray",
              marginTop: 15,
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder="New Playlist Name"
              value={newPlaylistName}
              onChangeText={(text) => setNewPlaylistName(text)}
              style={{ fontSize: 20, color: "gray" }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
            }}
          >
            Description:
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              padding: 6,
              paddingLeft: 8,
              borderRadius: 5,
              borderColor: "gray",
              marginTop: 15,
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder="Enter description"
              placeholderTextColor={"white"}
              editable
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={{ fontSize: 20, color: "gray" }}
            />
          </View>
          <View>
            {/* <Pressable onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Select playlist image</Text>
            </Pressable> */}
            <input
              type="file"
              accept="image/*"
              id="albumImage"
              onChange={(e) => getImageURL(e.target.files![0])}
            ></input>
          </View>
        </>
      )}

      {selectedPlaylist === "Create New Playlist" ? (
        <Pressable
          onPress={() => console.log("Create playlist")}
            //() =>
            // createPlaylist(
            //   description,
            //   (document.getElementById("albumImage") as HTMLInputElement).src
            // )
          style={styles.button}
          accessibilityLabel="addconfirm"
          accessible={true}
        >
          <Text style={styles.buttonText}>Add Song</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={addSong}
          style={styles.button}
          accessibilityLabel="addconfirm"
          accessible={true}
        >
          <Text style={styles.buttonText}>Add Song</Text>
        </Pressable>
      )}
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
