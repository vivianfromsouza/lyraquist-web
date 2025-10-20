import { Text, View, Pressable } from "react-native-web";
import { TextInput } from "react-native";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaylistReaderWriter from "../services/PlaylistReaderWriter";
import RecordReaderWriter from "../services/RecordReaderWriter";
import SongReaderWriter from "../services/SongReaderWriter";
import playlistStyles from "../styles/PlaylistStyles";

const CreateNewPlaylistForm = ({ songItem }) => {
  const navigate = useNavigate();
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const songURL = songItem["spotifyURL"]?.split(":")[2] || "";
  const [imageURL, setImageURL] = useState<string>();

  async function createPlaylist(
    description = "",
    imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
  ) {
    const newPlaylistId = await PlaylistReaderWriter.createPlaylist(
      newPlaylistName,
      description,
      imageURL
    );

    if (songURL !== "") {
      if (!(await SongReaderWriter.isSongInDB(songURL))) {
        await SongReaderWriter.addSongToDBFromSongCard(songItem);
      }
      await RecordReaderWriter.addSongToRecords(songURL, newPlaylistId);
    }
    navigate(-1);
  }

  return (
    <>
    <View style={{flex:1,backgroundColor: "#e8e1db", height:'80vh'}}>
      <Text
        testID="playlist-name-label"
        style={{
          fontSize: 30,
          color: "#303248",
          margin:10,
          fontWeight:'bold'
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
          marginHorizontal:10
        }}
      >
        <TextInput
          testID="playlist-name-input"
          placeholder="Enter New Playlist Name"
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
          marginLeft:10
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
          marginHorizontal:10
        }}
      >
        <TextInput
          testID="description-input"
          placeholder="Enter Description"
          placeholderTextColor={"grey"}
          editable
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={{ fontSize: 20, color: "gray" }}
        />
      </View>
      <View style={{marginLeft:10, marginBottom:10}}>
        <input
          test-id="image-input"
          type="file"
          accept="image/*"
          onChange={(e) => setImageURL(URL.createObjectURL(e.target.files![0]))}
        />
      </View>
      <Pressable
        onPress={() => {
          console.log("button pressed");
          createPlaylist(description, imageURL);
        }}
        testID="add-song"
        style={playlistStyles.button}
        accessibilityLabel="addconfirm"
      >
        <Text style={playlistStyles.buttonText}>Create Playlist</Text>
      </Pressable>
      </View>
    </>
  );
};

export default CreateNewPlaylistForm;
