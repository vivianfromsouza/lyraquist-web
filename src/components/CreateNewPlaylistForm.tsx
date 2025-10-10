import { Text, View, Pressable } from "react-native-web";
import { StyleSheet, TextInput } from "react-native";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";

const CreateNewPlaylistForm = ({ songItem }) => {
  const navigate = useNavigate();
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const songURL = songItem["spotifyURL"].split(":")[2];

  async function createPlaylist(
    description = "",
    imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
  ) {
    console.log("createPlaylist called");
    const newPlaylistId = await PlaylistReaderWriter.createPlaylist(
      newPlaylistName,
      description,
      imageURL
    );

    if (!(await SongReaderWriter.isSongInDB(songURL))) {
      await SongReaderWriter.addSongToDBFromSongCard(songItem);
    }
    await RecordReaderWriter.addSongToRecords(songURL, newPlaylistId);
    navigate(-1);
  }

  return (
    <>
      <Text
        testID="playlist-name-label"
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
          testID="playlist-name-input"
          placeholder="New Playlist Name"
          value={newPlaylistName}
          onChangeText={(text) => setNewPlaylistName(text)}
          style={{ fontSize: 20, color: "gray" }}
        />
      </View>
      <Text
        testID="description-label"
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
          testID="description-input"
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
        {/* <input
          type="file"
          accept="image/*"
          id="albumImage"
          onChange={(e) => getImageURL(e.target.files![0])}
        ></input> */}
      </View>
      <Pressable
        onPress={() => {
          console.log("button pressed");
          createPlaylist(
            description
            // (document.getElementById("albumImage") as HTMLInputElement).src
          );
        }}
        testID="add-song"
        style={styles.button}
        accessibilityLabel="addconfirm"
      >
        <Text style={styles.buttonText}>Add Song</Text>
      </Pressable>
    </>
  );
};

export default CreateNewPlaylistForm;

const styles = StyleSheet.create({
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
